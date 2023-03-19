// import format from date-fns
const { format } = require('date-fns');

// import uuid v4 from uuid
const { v4: uuid } = require('uuid');

// import file system
const fs = require('fs');

// import file system promises
const fsPromises = require('fs').promises;

// import path
const path = require('path');

const logEvents = async (message, logName) => {
    // Get date and time
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

    // Display date, time, uuid and message
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // Check if /log folder directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            // Create ./logs directory
            await fsPromises.mkdir(path.join(__dirname, './logs'));
        }
        //test
        // Create/append the file passed via logName parameter with the date, time, uuid and message from logItem
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;