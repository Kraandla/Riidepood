const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.getAll = async (req, res) => {
    const AllUsers = await db.users.findAll();
    console.log('get all users' + AllUsers);
    res.status(200).send(AllUsers.map(({UserID, FirstName, LastName, Email}) => {return {UserID, FirstName, LastName, Email}}));


}

exports.createUser = async (req, res) => {
    if (!req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.Password) {
        return res.status(400).send({error: "Missing some parameters."});
    }
    if (await db.users.findOne({where: {Email: req.body.Email}})) {
        return res.status(409).send({error: "Email already in use."});
    }

    const newUser ={
        UserID: UUID.uuidv7(),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
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
      if (!req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.Password) {
        return res.status(400).send({error: "Missing some parameters."});
    }
    if (req.body.Email !== userToBeModified.Email) {
        if (await db.users.findOne({where: {Email: req.body.Email}})) {
            return res.status(409).send({error: "Email already in use."});
        }
    }
    userToBeModified.FirstName = req.body.FirstName;
    userToBeModified.LastName = req.body.LastName;
    userToBeModified.Email = req.body.Email;
    userToBeModified.Password = req.body.Password;
    await userToBeModified.save();
    return res.location(`${Utilities.getBaseUrl(req)}/users/${userToBeModified.UserID}`)
    .sendStatus(201).send(userToBeModified);
}

exports.deleteUserByID = async (req, res) => {
    const userToBeDeleted = await db.users.findByPk(req.params.UserID);
    if (!userToBeDeleted) {
        return res.status(404).send({error: "User not found."});
    }
    await userToBeDeleted.destroy();
    return res.sendStatus(204).send({error: "No Content"});
}