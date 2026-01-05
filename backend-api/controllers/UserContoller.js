const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.getAll = async (req, res) => {
    const AllUsers = await db.users.findAll();
    console.log('get all users' + AllUsers);
    res.status(200).send(AllUsers.map(({UserID, Username, Email}) => {return {UserID, Username, Email}}));
}