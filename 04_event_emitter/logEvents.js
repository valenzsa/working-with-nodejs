const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {

        // If logs directory doesn't exist
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            // Create logs directory
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        //testing log file
        // Create an eventLog.txt file if doesn't exist.  The file will be saved under /logs directory
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;