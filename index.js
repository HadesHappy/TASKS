let express = require('express');
let morgan = require('morgan');
let rt = require("file-stream-rotator");
let Writable = require("stream").Writable
let mongoose = require('mongoose');
let cors = require('cors');
let createError = require('http-errors');
let bodyParser = require('body-parser');

class TerminalStream extends Writable {
    write(line) {
        // Here you send the log line to wherever you need
        console.log("Logger: ", line);
    }
}
let fileWriter = rt.getStream({
    filename: "tasks.log",
    frequency: "daily",
    verbose: true
});
let terminalWriter = new TerminalStream();

// Skip requests that aren't for the homepage.
let skipSuccess = (req, res) => res.statusCode < 400;
let skipError = (req, res) => res.statusCode >= 400;
// Express Route
const taskRoute = require('./routes/task.route');
// Connecting mongoDB Database
mongoose
    .connect('mongodb://127.0.0.1:27017/mydatabase')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', error.reason)
    })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
// Success logging
app.use(morgan('combined', {
    skip: skipError,
    stream: fileWriter
}))

// Error logging
app.use(morgan('combined', {
    skip: skipSuccess,
    stream: terminalWriter
}))

app.use('/tasks', taskRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
