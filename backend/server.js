import express from "express"
import handler from "./controllers/index.js"
import dotenv from 'dotenv'
dotenv.config()


const port = process.env.PORT || 5001

import indexRouter from "./routes/index.js"
import userRouter from "./routes/user/index.js"

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log("hello from middleware")
    next()
})

app.post("*", async (req, res) => {
    console.log("____post req.body:")
    console.log(req.body)
    res.send(await handler(req))
})


app.use("/", indexRouter)
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
