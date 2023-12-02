package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/stan-dot/golang-nextjs-websockets-test/funcs"
	"log"
	"net/http"
	"sync"
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

var leaderboard = LeaderBoardStatus{
	Profiles: []LeaderBoardRow{},
	QuizName: "Test 4",
	Final:    false,
}

var leaderboardMutex sync.Mutex
var leaderboardCond = sync.NewCond(&leaderboardMutex)

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

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.POST("/start_quiz", func(c *gin.Context) {
		id := c.Param("id")
		// make sure CORS is ok
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		// todo get the quiz from Mongo
		var quizOk = false
		if quizOk {
			c.JSON(http.StatusOK, gin.H{"quiz id": id})
		} else {
			c.JSON(http.StatusNoContent, gin.H{"quiz": "does not exist"})
		}
	})

	// todo add a req containing the quiz
	r.GET("/socket", func(c *gin.Context) {
		conn, _, _, err := ws.UpgradeHTTP(c.Request, c.Writer)
		if err != nil {
			log.Println("error with WebSOcket: ", err)
			c.Writer.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		// todo there's one goroutine for every message type
		// the only non-broadcast is to the teacher. must save the teacher socket connection as special

		// order of events

		// broadcast the new quiz
		// for every question until the last one:
		// wait until time passes or everyone responds
		// broadcast leaderboard
		// when all questions are done, send the leaderboard with the final flag as the finished message.
		// when done, send the results to the scores service
		// todo in unmarshal this will do the read of any message and there the decision what to do. wrong, the type must be known to unmarshal
		// the new events are sent when the teacher sends them
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
		score := funcs.CalculateScore(answer.TimeMiliseconds, questionTimer, pointsPossible)
		fmt.Printf("Participant %s scored %d on question %d\n", answer.StudentID, score, answer.AnswerNumber)
	}
}
