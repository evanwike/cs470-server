const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sql = require('mssql');
const DB_CONFIG = require('config').get('db');
const config = `mssql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.server}/${DB_CONFIG.database}?encrypt=true`;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

function send(res, data, err) {
    if (err) {
        console.error(err);
        return;
    }
    res.send(data.recordset);
}

// Get all patients
app.get('/patients', (req, res) => {
    sql.connect(config, () => {
        const request = new sql.Request();
        request.query('SELECT * FROM dbo.Patient', (err, data) => {
            send(res, data, err);
        });
    });
});

// Get all therapists
app.get('/therapists', (req, res) => {
    sql.connect(config, () => {
        const request = new sql.Request();
        request.query('SELECT * FROM dbo.Physical_Therapist', (err, data) => {
            send(res, data, err);
        });
    });
});

// Get all results
app.get('/results', (req, res) => {
    sql.connect(config, () => {
        const request = new sql.Request();
        request.query('SELECT * FROM dbo.Results', (err, data) => {
            send(res, data, err);
        });
    });
});

// Get all tests
app.get('/tests', (req, res) => {
    sql.connect(config, () => {
        const request = new sql.Request();
        request.query('SELECT * FROM dbo.Test', (err, data) => {
            send(res, data, err);
        });
    });
});

// Get patient tests
app.get('/patient/tests/:patientId', function (req, res) {
    sql.connect(config, () => {
        const request = new sql.Request();
        request.input('PatientID', req.params.patientId);
        request.execute('dbo.get_first_last_tests_by_patient', (err, data, returnValue, affected) => {
            send(res, data, err);
        });
    });
})

// Get patient history
app.get('/patient/history/:patientId', function (req, res) {
    sql.connect(sqlConfig, () => {
        const request = new sql.Request();
        request.input('PatientID', req.params.patientId);
        request.execute('dbo.get_first_last_tests_by_patient', (err, data, returnValue, affected) => {
            send(res, data, err);
        });
    });
})

module.exports = app;
