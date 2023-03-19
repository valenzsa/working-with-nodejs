const logEvents = require('./logEvents');

const EventEmitter = require('events');

// Create class object called MyEmitter
class MyEmitter extends EventEmitter { };

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on('log', (msg) => {
    logEvents(msg);
});

// Optional: just need to have a timer
setTimeout(() => {
    // Emit event
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);