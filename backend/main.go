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

type QuizState struct {
	Quiz          Quiz   `json:"quiz"`
	QuestionIndex int32  `json:"question_index"`
	TeacherId     string `json:"teacher_id`
}

var initialQuiz = Quiz{
	Title:     "Test 4",
	Questions: []Question{},
}

var quizState = QuizState{
	Quiz:          initialQuiz,
	QuestionIndex: 0,
	TeacherId:     "",
}

type Event struct {
	Type     MessageType `json:"type"`
	SenderId string      `json:"sender_id"`
}

var quizStateMutex sync.Mutex
var quizStateCond = sync.NewCond(&quizStateMutex)

var leaderboardMutex sync.Mutex
var leaderboardCond = sync.NewCond(&leaderboardMutex)

var document = Document{
	Title: "Test document",
	Body:  "Hello world\n here is a second line",
}

var documentMutex sync.Mutex
var documentCond = sync.NewCond(&documentMutex)

type MessageType int

const (
	TeacherStart MessageType = iota
	StudentAnswer
	TeacherFinishThisQuestion
)

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

	// todo add a req containing the quiz id
	r.GET("/socket", func(c *gin.Context) {
		conn, _, _, err := ws.UpgradeHTTP(c.Request, c.Writer)
		if err != nil {
			log.Println("error with WebSocket: ", err)
			c.Writer.WriteHeader(http.StatusMethodNotAllowed)
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
				var result Event
				err = json.Unmarshal(data, result)
				if err != nil {
					documentMutex.Unlock()
					log.Println("error unmarshalling document: ", err)
					return
				}
				// todo must lock the given resource and then update it
				switch result.Type {
				case TeacherFinishThisQuestion:
					// if this is the last question, send the results back to the scoring service
					leaderboard.Final = true
				case TeacherStart:

				case StudentAnswer:
					// leaderboard.Profiles.
					// check if answer correct
					// check the time difference
					// add points
					// calculate a new leaderboard
				}

				documentCond.Broadcast()
				documentMutex.Unlock()
			}
		}()

		go func() {
			defer conn.Close()

			for {
				// update everyone with game state and leaderboard state
				// if game state not last, send the latest question. in the client only update question if wrong
				// if game, send message that no game is here
				quizStateMutex.Lock()
				quizStateCond.Wait()
				quizStateMutex.Unlock()

				var messageData bytes.Buffer
				err := json.NewEncoder(&messageData).Encode(&leaderboard)
				if err != nil {
					log.Println("error encodig leaderboard: ", err)
					return
				}
				// err = wsutil.WriteServerMessage(conn, ws.OpText, []byte(`{"text": "from-websocket-in-gin"}`))
				err = wsutil.WriteServerMessage(conn, ws.OpText, messageData.Bytes())
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

// todo connect here to the Mongo API
func postResults(results LeaderBoardStatus) {

}
