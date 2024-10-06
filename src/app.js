const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.options('*', cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors()); 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes'); 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

module.exports = { app };
