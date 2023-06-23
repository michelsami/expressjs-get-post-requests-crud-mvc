import express from 'express'
import { userRouter } from './routes/export-all.js'
import bodyParser from 'body-parser';

const port = 3000

const app = express()

app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

