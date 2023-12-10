

# Backend
## Mongo backend
- [x] mongodb https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/ - already in mflix
- [x] add quiz representation
- [x] connect to Mongo via Prisma with hooks https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/connect-your-database-typescript-mongodb
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/introspection-typescript-mongodb
## go backend
- [x] sortout the go path issue
- [x] write goroutines for different socket connections = not needed
- [x] write the server internals in another package and import funcs as necessary

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



- [x] add more callbacks
- [x] change the getServerProps for the quiz thing
- [x] shared components
  - [x] primary button
  - [x] secondary button
  - [x] color into Tailwind
  - [x] kahoot colors https://www.colorbook.io/colorschemes/view/1021