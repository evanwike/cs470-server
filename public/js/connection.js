const Connection = require('tedious').Connection

// Create connection to database using environment variables
// FIXME: Replace with environment variables
const config = {
    authentication: {
        options: {
            userName: "evan",
            password: "5291Ev!n"
        },
        type: "default"
    },
    server: "umkc-cs470.database.windows.net",
    options: {
        db: "cs470",
        encrypt: true
    }
};

const connection = new Connection(config);
connection.on('connect', err => {
    console.log("Connected");
});

module.exports = connection;
