const { Connection, Request } = require("tedious");
require('dotenv').config();

// Create connection to database using environment variables
const config = {
    authentication: {
        options: {
            userName: process.env.USERNAME,
            password: process.env.PASSWORD
        },
        type: "default"
    },
    server: process.env.SERVER,
    options: {
        database: process.env.DB,
        encrypt: true
    }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        queryDatabase();
    }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `SELECT * from dbo.Patient`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(`Returned ${rowCount} rows.`)
            }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}
