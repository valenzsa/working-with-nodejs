const fs = require('fs');


// // Check if directory does not exists
// if (!fs.existsSync('./new')) {
//     fs.mkdir('./new', (err) => {
//         if (err) throw err;
//         console.log('Directory created');
//     });
// } else {
//     console.log('Directory already exists!');
// }

// Check if directory exists, if so delete it
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory deleted');
    });
} else {
    console.log('Directory does not exists!');
}

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});