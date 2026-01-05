const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.create =
async (req, res) => {
    if (
        !req.body.Status,
        !req.body.Items
    ){
        return res.status(400).send({error: 'Missing some parameters.'});
    }
    const newOrder = {
        ProductID: UUID.uuidv7(),
        Status: false,
        Items: req.body.Items
    }

    const createdOrder = await db.orders.create(newOrder);
    return res
    .location
    (`${Utilities.getBaseUrl(req)}/orders/${createdOrder.OrderID}`)
    .sendStatus(201);
}