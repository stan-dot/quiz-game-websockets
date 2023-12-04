package funcs

import "github.com/google/uuid"

func GenerateClientID() string {
	return uuid.New().String()
}
