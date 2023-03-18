// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window

console.log("Hello World");

// 3) global object instead of window object

//console.log(global);

// 4) Has Common Core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) Missing some JS APIs like fetch

const os = require('os');
const path = require('path');

//const math = require('./math');
const { add, subtract, multiply, divide } = require('./math');

// Get information about the 'os'
console.log(os.type()); // Windows_NT
console.log(os.version()); // Windows 10 Pro
console.log(os.homedir()); //

console.log(__dirname); // folder directory of the file you're currently on
console.log(__filename); // shows the full directory of the file you're currently on

console.log(path.dirname(__filename)); // folder directory of the file you're currently on
console.log(path.extname(__filename)); // returns the file extension.
console.log(path.basename(__filename)); // returns the filename and its extension.

console.log(path.parse(__filename)); // returns an object consisting of root, dir, base, ext and name of the file

// console.log('Add: ' + math.add(2, 3));
// console.log('Subtract: ' + math.subtract(5, 3));
// console.log('Multiply: ' + math.multiply(3, 3));
// console.log('Divide: ' + math.divide(10, 2));
console.log('Add: ' + add(2, 3));
console.log('Subtract: ' + subtract(5, 3));
console.log('Multiply: ' + multiply(3, 3));
console.log('Divide: ' + divide(10, 2));