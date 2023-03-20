const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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
// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'https://yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    // Args
    // origin - site that requested this site
    // !origin - undefined/false (site isn't in the whitelist, therefore its undefined)
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
});

// Redirect
// 302 -> 301
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attemted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

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