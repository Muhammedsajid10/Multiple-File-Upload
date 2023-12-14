require("dotenv").config();
const connection = require("./mongoDb/mongoose");
const userRouter = require("./router/userRouter");
const fileRouter = require('./router/fileRouter')
const express = require("express");
const app = express();


connection()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", userRouter);
app.use(fileRouter)
app.use((req, res, next) => {
    res.status(404).json("Page not found")
})

const port = process.env.port || 6000
app.listen(port, () => {
    console.log(`Server's running on port ${port}`);
})