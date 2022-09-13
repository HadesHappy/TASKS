let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let createError = require('http-errors');
let bodyParser = require('body-parser');
// Express Route
const taskRoute = require('./routes/task.route');
const { MongoCursorExhaustedError } = require('mongodb');
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
