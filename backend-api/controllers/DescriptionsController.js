const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.create =
async (req, res) => {
    if (
        !req.body.Material ||
        !req.body.Color ||
        !req.body.Size
    ){
        return res.status(400).send({error: 'Missing some parameters or they are invalid.'});
    }
    const newDescription = {
        DescriptionID: UUID.uuidv7(),
        Material: req.body.Material,
        Color: req.body.Color,
        Size: req.body.Size
    }
    const createdDescription = await db.descriptions.create(newDescription);

    return res.location
    (`${Utilities.getBaseUrl(req)}/descriptions/${createdDescription.DescriptionID}`)
    .sendStatus(201);
}