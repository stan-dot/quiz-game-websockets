## questions - put all into notes on resolution for the track record
- [x] ask about color scheme and buttons shape, etc
- [ ] what devices are the teachers and students using? (East Africa phone market)
- [ ] server - on prem (raspberry?) or cloud. where is the current one deployed?
- [ ] permissions - can all teachers modify all quizzes?
- [ ] is it ok if the results can only be viewed on the other platform (g docs?)
- [ ] class functionality - only see class and list of students, tick who is ready and send quiz?
- [ ] does the teacher send when new
- [ ] fonts? https://drive.google.com/drive/folders/1IuVU69ZFQDQWoB7dcr3L7ctgT2bMunFY
- [ ] logo - the main directed one or something different?
- [ ] footer stuff

## warmup priority todo
- [ ] fix the go and the sockets responses
- [ ] make sure that the scripted flow works as intended
- [ ] doing the test playground for test

# Frontend
- [x] add more callbacks
- [x] change the getServerProps for the quiz thing
- [x] shared components
  - [x] primary button
  - [x] secondary button
  - [x] color into Tailwind
  - [x] kahoot colors https://www.colorbook.io/colorschemes/view/1021

- [ ] fix new quiz creation
- [ ] should be pretty - using Directed assets from hoole drive

# Backend
## Mongo backend
- [x] mongodb https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/ - already in mflix
- [x] add quiz representation
- [ ] add sessions https://github.com/gin-contrib/sessions
- [ ] connect to Mongo via Prisma with hooks https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/connect-your-database-typescript-mongodb
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/introspection-typescript-mongodb

- [ ] how to put the results into Google Sheets programatically? https://developers.google.com/sheets/api/guides/concepts

## go backend
- [x] sortout the go path issue
- [x] write goroutines for different socket connections = not needed
- [x] write the server internals in another package and import funcs as necessary
- [ ] magic link login for all - there was Web Dev Simplified video about this https://www.youtube.com/watch?v=b6qHfPdv4Y8
  - [ ] that uses JWT

# BIN
check web dev simplified for different ways to do this
ask chat how to do that best in terms of this component
possibly have this in a context, so that context consumers can move easily towards it
OTOH all triggers of this will be either locally(optimistic updates) or due to socket changes
valdiate emails that are actually relevant, and not changed
where to initialize that global object for the session

- [ ] consider timer for guidance for both parties, with suggested time for each question. or maybe only for the teacher

## research
- [x] on the general process of migrating from a google spreadsheets to a normal database - there's a track record on that
- [x] check go sockets scalability vertically - not a worry
- [x] mobile first - maybe some emulator to see better? the window is suboptimal

