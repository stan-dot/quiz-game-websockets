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

## new todo
- [ ] fix the go and the sockets responses
- [ ] make sure that the scripted flow works as intended
- [ ] style with Directed assets from google drive
- [ ] how to put the results into Google Sheets programatically? https://developers.google.com/sheets/api/guides/concepts

## login and sessions
- [ ] ok this is actually quite a complex thing
- [ ] add sessions https://github.com/gin-contrib/sessions
- [ ] magic link login for all - there was Web Dev Simplified video about this https://www.youtube.com/watch?v=b6qHfPdv4Y8
  - [ ] that uses JWT, sent with the verification link. users send it and then it's verified against that
  - [ ] there is a Mongo variant
- [ ] nextjs specific approach https://nextjs.org/docs/pages/building-your-application/routing/authenticating
- [ ] this as well https://www.passportjs.org/
- [ ] passport auth example https://github.com/passport/todos-express-email
- [ ] fix new quiz creation

## student UI stages
- [ ] connect 
  - [ ] get the quiz from the db
  - [ ] establish the socket connection
  - [ ] get the first question

