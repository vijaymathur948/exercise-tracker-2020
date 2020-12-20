console.clear()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const buildPath = path.join(__dirname, "build")
require("dotenv").config()

const app = express()
const port = 1000

app.use(express.static(buildPath))

app.use(cors())
app.use(express.json())

const exercisesRouter = require("./Routes/Exercises")
const usersRouter = require("./Routes/Users")
const uri = process.env.ATLAS_URI

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"))
})

app.use("/exercises", exercisesRouter)
app.use("/users", usersRouter)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
