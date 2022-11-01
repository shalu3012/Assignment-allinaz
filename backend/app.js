const express = require('express')
const app = express()
const port = 5000
require("./dbconnection/db")
const dotenv = require("dotenv");
const cors = require("cors");
const calcRoutes=require("./controller/calcController")

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use('/api',calcRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})