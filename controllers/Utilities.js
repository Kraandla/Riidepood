const {db} = require('../db');
exports.getBaseUrl = (req) => {
    return (req.connection && req.connection.encrypted ? "https":"https")+`://${Headers.host}`;
}