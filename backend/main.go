package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

type Question struct {
	Text          string   `json:"text"`
	Answers       []string `json:"answers"`
	CorrectAnswer int8     `json:"correct_answer"`
}

type Quiz struct {
	Title     string     `json:"title"`
	Questions []Question `json:"questions"`
}

type Answer struct {
	QuizID          string `json:"quiz_id"`
	TimeMiliseconds int32  `json:"time_miliseconds"`
	AnswerNumber    int8   `json:"answer"`
	StudentID       string `json:"student_id"`
}

type LeaderBoardStatus struct {
	Profiles []LeaderBoardRow `json:"profiles"`
	QuizName string           `json:"quiz_name"`
	Final    bool             `json:"final"`
}

type LeaderBoardRow struct {
	StudentId string `json:"student_id"`
	Points    int32  `json:"points"`
}

type Document struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

var document = Document{
	Title: "Test document",
	Body:  "Hello world\n here is a second line",
}

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
		c.JSON(http.StatusOK, gin.H{"text": "updated"})
	})

	r.POST("/start_session", func(c *gin.Context) {
		// make sure CORS is ok
		// read in the request
		// todo get the quiz from Mongo
		// wait for connections from students - launch some internal function. maybe return the session address?
		// so that the frontend automatically switches to monitor quiz mode?
		c.JSON(http.StatusOK, gin.H{"text": "updated"})
	})

	// todo add a req containing the quiz
	r.GET("/socket", func(c *gin.Context) {
		conn, _, _, err := ws.UpgradeHTTP(c.Request, c.Writer)
		if err != nil {
			log.Println("error with WebSOcket: ", err)
			c.Writer.WriteHeader(http.StatusMethodNotAllowed)
			// todo not sure is ok
			return
		}
		// todo there's one goroutine for every message type
		// the only non-broadcast is to the teacher. must save the teacher socket connection as special

		// order of events

		// init an array of scores (a copy of the leaderboard)
		// broadcast the new quiz
		// for every question until the last one:
		// wait until time passes or everyone responds
		// broadcast leaderboard
		// when all questions are done, send the leaderboard with the final flag as the finished message.
		// when done, send the results to the scores service
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
				// todo need to figure out the non-broadcast option
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

func processQuiz(quiz Quiz, answers []Answer) {
	// Example: let's assume all questions have the same timer and points
	questionTimer := int32(30) // 30 seconds for each question

	pointsPossible := 1000

	for _, answer := range answers {
		score := CalculateScore(answer.TimeMiliseconds, questionTimer, pointsPossible)
		fmt.Printf("Participant %s scored %d on question %d\n", answer.StudentID, score, answer.AnswerNumber)
	}
}

// this is from here
// https://support.kahoot.com/hc/en-us/articles/115002303908-How-points-work
// CalculateScore calculates the score for a given response.
func CalculateScore(timeMicroseconds int32, questionTimer int32, pointsPossible int) int {
	// Convert response time to seconds
	responseTimeInSeconds := float64(timeMicroseconds) / 1e6
	// Apply the formula
	score := (1 - ((responseTimeInSeconds / float64(questionTimer)) / 2)) * float64(pointsPossible)
	// Round to nearest whole number
	return int(math.Round(score))
}
