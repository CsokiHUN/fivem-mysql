const DEBUG = false; //Show times

const mysql = require('mysql2');

let connString = false;
let connData = {};

function init() {
    try {
        connString = GetConvar('mysql_connection_string');
        const splitted = connString.split(';');

        splitted.forEach((element) => {
            const spl = element.split('=');

            connData[spl[0]] = spl[1];
        });
    } catch (error) {
        connString = false;

        const file = LoadResourceFile(
            GetCurrentResourceName(),
            'settings.json'
        );
        if (file) {
            connData = JSON.parse(file);
            connData.namedPlaceholders = true;
        } else {
            console.error(
                'settings.json not exists! connection data NOT found.'
            );
        }
    }

    const connection = mysql.createConnection(getConnectionData());
    connection.connect(function (err) {
        if (err) {
            console.warn('Script can connect to MySQL server!');
            return console.error(err);
        }

        console.info('MySQL connected successfully.');

        connection.close();
    });
}
init(); //Start script

function getConnectionData() {
    if (connString) {
        return {
            host: connData.server,
            user: connData.userid,
            password: connData.password,
            database: connData.database,
            namedPlaceholders: true,
        };
    }
    return connData;
}
exports('getConnectionData', getConnectionData);

// Exports
function query(queryString, args, cb) {
    if (typeof args != 'object') return console.error('query args not array!');

    const conn = mysql.createConnection(getConnectionData());

    conn.query(queryString, args, function (err, rows) {
        if (err) console.error(err);

        if (cb) cb(rows);

        conn.close();
    });
}
exports('query', query);

function exec(queryString, args) {
    const conn = mysql.createConnection(getConnectionData());

    conn.execute(queryString, args, function () {
        conn.close();
    });

    return true;
}
exports('exec', exec);
