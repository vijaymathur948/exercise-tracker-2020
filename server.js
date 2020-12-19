console.clear()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const publicPath = path.join(__dirname, "../", "public")
require("dotenv").config()

const app = express()
const port = 1000

app.use(express.static(publicPath))
app.use(cors())
app.use(express.json())

const exercisesRouter = require("./Routes/Exercises")
const usersRouter = require("./Routes/Users")
const uri = process.env.LOCALHOST_URI

// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"))
// })

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
