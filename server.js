const DEBUG = true; //Show times

const mysql = require('mysql2');

let connString = false;
let connData = {};

AddEventHandler('onResourceStart', (resourceName) => {
    if (resourceName != GetCurrentResourceName()) {
        return;
    }
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
});

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
    const startTime = new Date().getTime();

    conn.query(queryString, args, function (err, rows) {
        if (err) console.warn(err);

        if (cb) cb(rows);

        if (DEBUG) {
            console.log(`query time: ${new Date().getTime() - startTime}ms`);
        }

        conn.close();
    });
}
exports('query', query);

function exec(queryString, args) {
    if (args && typeof args != 'object')
        return console.error('query args not array!');

    const conn = mysql.createConnection(getConnectionData());
    const startTime = new Date().getTime();

    return conn.execute(queryString, args, function (err) {
        if (err) console.warn(err);
        conn.close();

        if (DEBUG) {
            console.log(`exec time: ${new Date().getTime() - startTime}ms`);
        }
    });
}
exports('exec', exec);
