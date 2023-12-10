package test

import (
	"github.com/steinfletcher/apitest"
	"net/http"
	"testing"
)

func TestGetMessage(t *testing.T) {
	handler := func(w http.ResponseWriter, r *http.Request) {
		msg := `{"message": "hello"}`
		_, _ = w.Write([]byte(msg))
		w.WriteHeader(http.StatusOK)
	}

	apitest.New(). // configuration
			HandlerFunc(handler).
			Get("/message"). // request
			Expect(t).       // expectations
			Body(`{"message": "hello"}`).
			Status(http.StatusOK).
			End()
}
