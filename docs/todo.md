## questions
- [ ] what devices are the teachers and students using? (East Africa phone market)
- [x] ask about color scheme and buttons shape, etc
- [ ] server - on prem (raspberry?) or cloud. where is the current one deployed?
- [ ] permissions - can all teachers modify all quizzes?
- [ ] is it ok if the results can only be viewed remotely?

## research
- [ ] how to put the results into Google Sheets programatically?
- [ ] 

# Frontend
- [x] add more callbacks

## style
- [ ] mobile first
- [ ] fix new quiz creation
- [ ] should be pretty - using Directed assets from hoole drive

# Backend
## Mongo backend
- [ ] mongodb https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/ - already in mflix
- [ ] add quiz representation
- [ ] connect to Mongo with hooks
- [ ] add Prisma, that should be the simplest thing

## go backend
- [ ] sortout the go path issue
- [ ] write goroutines for different socket connections
- [ ] check go sockets scalability vertically
- [ ] write the server internals in another package and import funcs as necessary
- [ ] magic link login for all - there was Web Dev Simplified video about this https://www.youtube.com/watch?v=b6qHfPdv4Y8
  - [ ] that uses JWT

## integration and further features
- [ ] stats for the teacher
- [ ] stats for each student
- [ ] import feature https://support.kahoot.com/hc/en-us/community/posts/360026447594-Exporting-Kahoot-quizzes

# BIN
check web dev simplified for different ways to do this
ask chat how to do that best in terms of this component
possibly have this in a context, so that context consumers can move easily towards it
OTOH all triggers of this will be either locally(optimistic updates) or due to socket changes
valdiate emails that are actually relevant, and not changed
where to initialize that global object for the session

- [ ] consider timer for guidance for both parties, with suggested time for each question. or maybe only for the teacher