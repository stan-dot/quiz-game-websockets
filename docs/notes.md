
## validation of interfaces between frontend and backend - NO VALIDATION
it might be simple enough for the async thing to work
there's only this tool for such documentation and it isn't well developed
https://www.asyncapi.com/

## Q&A
Q: what is the the best way to handle downstream state - whether in the smaller component or higher up?
A: minimal prop surface area better

Q: how to sort out different events in the sockets connection in go?
A: Use one go routine for the sending, one for receiving. in sending, send all pieces of state in separate mutexes, with the needed lock conditions

Q: Sending to the differnet clients
A: keep a map of the IDs and in the goroutine iterate through these, sending conditionally

## NOT doing
streaks - these are not taken into account when calculating scores
