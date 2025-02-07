import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import corsOptions from './src/config/cors.js'


const app = express()
const port = process.env.PORT

// cors
cors(corsOptions)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})