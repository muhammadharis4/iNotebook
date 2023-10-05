const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5001

// Middleware
app.use(cors())
app.use(express.json())

// Available Routes  
app.use('/api/auth', require('./modules/auth/auth.route'))
app.use('/api/notes', require('./modules/note/note.route'))

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})