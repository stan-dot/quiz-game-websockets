package funcs

import (
	"math"
)

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
