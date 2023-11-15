package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

type Document struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

type Question struct {
	Text          string   `json:"text"`
	Answers       []string `json:"answers"`
	CorrectAnswer int8     `json:"correct_answer"`
}

type Answer struct {
	QuizID           string `json:"quiz_id"`
	TimeMicroseconds int32  `json:"time"`
	AnswerNumber     int8   `json:"answer"`
}

// todo student profile to keep the streak

type StudentProfile struct {
	StudentId string `json:"student_id"`
	Streak    int8   `json:"streak"`
	Points    int32  `json:"points"`
}

type Quiz struct {
	Title     string     `json:"title"`
	Questions []Question `json:"questions"`
}

var document = Document{
	Title: "Test document",
	Body:  "Hello world\n here is a second line",
} // todo hack only one document now

var documentMutex sync.Mutex
var documentCond = sync.NewCond(&documentMutex)

func setupRouter() *gin.Engine {

	r := gin.Default()
	config := cors.DefaultConfig()
	log.Println(config)
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/handler-initial-data", func(c *gin.Context) {
		var documentBytes bytes.Buffer
		err := json.NewEncoder(&documentBytes).Encode(&document)
		if err != nil {
			log.Println("error encodigdocument: ", err)
			return
		}
		c.Writer.Header().Set(c.ContentType(), "application/json")
		reader := bytes.NewReader(documentBytes.Bytes())
		// c.Writer.Header().Set(c.Request.ContentLength(), "application/json")
		extraHeaders := map[string]string{
			"Test": "any",
		}
		c.DataFromReader(http.StatusOK, int64(documentBytes.Len()), "application/json", reader, extraHeaders)
		c.JSON(http.StatusOK, gin.H{"text": "initial"})
	})

	r.GET("/handler", func(c *gin.Context) {
		// todo make sure CORS is ok
		c.JSON(http.StatusOK, gin.H{"text": "updated"})
	})

	r.POST("/start_session", func(c *gin.Context) {
		// todo make sure CORS is ok
		// read in the request
		// get the quiz from Mongo
		// wait for connections from students - launch some internal function. maybe return the session address?
		// so that the frontend automatically switches to monitor quiz mode?
		c.JSON(http.StatusOK, gin.H{"text": "updated"})
	})

	r.GET("/socket", func(c *gin.Context) {
		conn, _, _, err := ws.UpgradeHTTP(c.Request, c.Writer)
		if err != nil {
			log.Println("error with WebSOcket: ", err)
			c.Writer.WriteHeader(http.StatusMethodNotAllowed)
			// todo not sure is ok
			return
		}

		go func() {
			for {
				defer conn.Close()
				data, err := wsutil.ReadClientText(conn)
				if err != nil {
					log.Println("error endoing document", err)
					return
				}

				documentMutex.Lock()
				err = json.Unmarshal(data, &document)
				if err != nil {
					documentMutex.Unlock()
					log.Println("error unmarshalling document: ", err)
					return
				}
				documentCond.Broadcast()
				documentMutex.Unlock()
			}
		}()
		go func() {
			defer conn.Close()

			for {
				documentMutex.Lock()
				documentCond.Wait()
				documentMutex.Unlock()

				// time.Sleep(time.Second)
				var documentBytes bytes.Buffer
				err := json.NewEncoder(&documentBytes).Encode(&document)
				if err != nil {
					log.Println("error encodigdocument: ", err)
					return
				}
				// err = wsutil.WriteServerMessage(conn, ws.OpText, []byte(`{"text": "from-websocket-in-gin"}`))
				err = wsutil.WriteServerMessage(conn, ws.OpText, documentBytes.Bytes())
				if err != nil {
					log.Println("error writing WebSocket data: ", err)
					return
				}
			}
		}()
		return
	})

	// that for custom 404
	// r.NoRoute()
	log.Println("Server is available at http://localhost:8000")
	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8000
	r.Run(":8000")
}
