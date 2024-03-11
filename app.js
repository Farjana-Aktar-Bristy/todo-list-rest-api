const express = require('express');
const router = require('./src/routes/routers');
const app = new express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Using all the imported middleware
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

//Creating mongodb connection (mongo atlas)
let URI = "mongodb+srv://FarjanaBristy:bristy16060@cluster0.1pwq7d3.mongodb.net/todo_list";
let OPTION = { autoIndex: true }
mongoose.connect(URI, OPTION, (error) => {
    if (error) {
        console.log("Mongo error ocurred:", error)
    } else {
        console.log("MongoDB Connection Successfull")
    }
});

// using router
app.use("/api/v1", router)

//If router path is not defined retrun 404
app.use("*", (req, res) => {
    res.status(404).json({ data: "Not Found" })
})

module.exports = app;