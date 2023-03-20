const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
//const logEvents = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Middlewares
// There are three typess of Middlewares
// 1.) Built-in middleware
// 2.) Custom middleware
// 3.) Middleware from third parties

// // Custom middleware logger
app.use(logger);
// app.use((req, res, next) => {
//     // req.headers.origin - where the request is coming, what website sent it to us
//     // req.url - what url was requested.
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
//     console.log(`${req.method} ${req.path}`);
//     next();
// });

// Third party middleware

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

//app.use('/')
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });
app.all('*', (req, res) => {
    res.status(404);
    // Check different types that can be accepted
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send(err.message);
// });

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));