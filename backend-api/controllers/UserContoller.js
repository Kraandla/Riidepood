const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.getAll = async (req, res) => {
    const AllUsers = await db.users.findAll();
    console.log('get all users' + AllUsers);
    res.status(200).send(AllUsers.map(({UserID, Username, Email}) => {return {UserID, Username, Email}}));


}

exports.createUser = async (req, res) => {
    if (!req.body.First_Name || !req.body.Last_Name || !req.body.Email || !req.body.Password) {
        return res.status(400).send({error: "Missing some parameters."});
    }

    const newUser ={
        UserID: UUID.uuidv7(),
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }

    const createdUser = await db.users.create(newUser);
    return res
        .location(`${Utilities.getBaseUrl(req)}/users/${createdUser.UserID}`)
        .sendStatus(201);

}