import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import corsOptions from './src/config/cors.js'
import connectDatabase from './src/config/database.js'
import route from './src/api/v1/routes/index.js'
import errorHandlingMiddleware from './src/middleware/errorHandlingMiddleware.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT

// cors
app.use(cors(corsOptions))

// connect database
connectDatabase()

// Fix Cache from disk from ExpressJS
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

// parse application/json
app.use(bodyParser.json())

// cookie
app.use(cookieParser())

// route
route(app)

// Xử lý lỗi tập trung
app.use(errorHandlingMiddleware)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})