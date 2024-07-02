import express from "express"
import mongoose from "mongoose"
import mailRouter from "./routers/Mail.js"
import authRouter from "./routers/Auth.js"
import helmet from "helmet"
import cors from "cors"

const app = express()

// connect to db
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected successfully"))
    .catch(() => console.log("connecting to DB failed"))

// config
app.use(express.json())
app.use(cors())
app.use(helmet())

// routers
app.use("/mail", mailRouter)
app.use("/auth", authRouter)

app.all("*", (req, res) => {
    res.status(404).json({
        message: "route not found"
    })
})

// error handeling
app.use((err, req, res, next) => {
    // print error stack if app isnt in production
    if (process.env.NODE_ENV !== "production") {
        console.log(err.stack)
    }
    
    if (!err.message) err.message = "an error occured"
    if (!err.status) err.status = 500

    res.status(err.status).json({
        message: err.message
    })

    next()
})

// run server
app.listen(3000, () => {
    console.log("server listening on port 3000")
})