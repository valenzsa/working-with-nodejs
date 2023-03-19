const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


// import ./logEvents directory
const logEvents = require('./logEvents');

// import events emitter
const EventEmitter = require('events');

class Emitter extends EventEmitter { };

// Initialize the MyEmitter class object
const myEmitter = new Emitter();

// add listener for the log event
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8' : ''
        );

        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );

        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    // Define the extention name
    const extension = path.extname(req.url);

    // Define contentType
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') {
        filePath += '.html';
    }

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        // 404
        // 301 - redirect
        //console.log(path.parse(filePath));

        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                // serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }

    // Define filePath
    // let filePath;

    // Not dynamic and can take up alot of space
    // due to all of other cases that comes in via req.url parameter such as duplicate cases, 404 and etc.
    // switch (req.url) {
    //     case '/':
    //         res.statusCode = 200;
    //         // set the file path we are looking at.  In this case, the index.html file under /views folder directory
    //         filePath = path.join(__dirname, 'views', 'index.html');

    //         // Read the index.html
    //         fs.readFile(filePath, 'utf-8', (err, data) => {
    //             res.end(data);
    //         });
    //         break;
    // }

    // Below is not efficient since there are files that are served that not an html file.
    // if (req.url === '/' || req.url === 'index.html') {
    //     // set response status code to 200 aka successful
    //     res.statusCode = 200;

    //     // serving an html page
    //     res.setHeader('Content-Type', 'text/html');

    //     // define the path and look for the index.html file inside the /views folder directory
    //     filePath = path.join(__dirname, 'views', 'index.html');

    //     // Then read the content inside the index.html 
    //     fs.readFile(filePath, 'utf-8', (err, data) => {
    //         res.end(data);
    //     })
    // }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg, 'logEvents.txt'));

// // Option: add a setTimeout for logging the events
// setTimeout(() => {
//     // Emit event
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);