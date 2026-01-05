const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.getAll = async (req, res) => {
    const AllUsers = await db.users.findAll();
    console.log('get all users' + AllUsers);
    res.status(200).send(AllUsers.map(({UserID, First_Name, Last_Name, Email}) => {return {UserID, First_Name, Last_Name, Email}}));


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

exports.getUserByID = async (req, res) => {
    const user = await db.users.findByPk(req.params.UserID);
    if (!user) {
        return res.status(404).send({error: "User not found."});
    }
    return res.status(200).send(user);
}

exports.updateUserByID = async (req, res) => {
    const userToBeModified = await db.users.findByPk(req.params.UserID);
    if (!userToBeModified) {
        return res.status(404).send({error: "User not found."});
    }
      if (!req.body.First_Name || !req.body.Last_Name || !req.body.Email || !req.body.Password) {
        return res.status(400).send({error: "Missing some parameters."});
    }
    userToBeModified.First_Name = req.body.First_Name;
    userToBeModified.Last_Name = req.body.Last_Name;
    userToBeModified.Email = req.body.Email;
    userToBeModified.Password = req.body.Password;
    await userToBeModified.save();
    return res.location(`${Utilities.getBaseUrl(req)}/users/${userToBeModified.UserID}`)
    .sendStatus(201).send(userToBeModified);
}