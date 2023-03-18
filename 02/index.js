//const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nHello! Nice to meet you.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.error(err);
    }
}

fileOps();

// fs.readFile('./file/starter.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// // Read File
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });
// console.log('Hello...');

// // Write File
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
//     if (err) throw err;
//     console.log('Write complete');

//     // Update File
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.', (err) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete');
//         });
//     });
// });

// // Update File
// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing text', (err) => {
//     if (err) throw err;
//     console.log('Append complete');
// });

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});