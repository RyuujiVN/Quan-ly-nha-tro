import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import corsOptions from './src/config/cors.js'
import connectDatabase from './src/config/database.js'
import route from './src/api/v1/routes/index.js'

const app = express()
const port = process.env.PORT

// cors
cors(corsOptions)

// connect database
connectDatabase()

// parse application/json
app.use(bodyParser.json())

// route
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})