const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuidv7');
const { Model } = require('sequelize');

exports.create =
async (req, res) => {
    console.log(req.body)
    if (
        !req.body.Products
    ){
        return res.status(400).send({error: 'Missing products in order.'});
    }
    const newOrder = {
        OrderID: UUID.uuidv7(),
        Status: false,
    };

    const createdOrder = await db.orders.create(newOrder);

    //TODO make it work with amounts
    await createdOrder.addProducts(req.body.Products);

    return res
    .location
    (`${Utilities.getBaseUrl(req)}/orders/${createdOrder.OrderID}`)
    .sendStatus(201)
}