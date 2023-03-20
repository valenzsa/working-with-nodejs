// Cross Origin Resource Sharing
const whitelist = [
    'https://www.yoursite.com',
    'https://yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];
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

module.exports = corsOptions;