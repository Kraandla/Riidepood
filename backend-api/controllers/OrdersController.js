const { Model } = require('sequelize');
const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuidv7');
const Product = db.products

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
    .sendStatus(201);
}

exports.getAll =
async (req, res) => {
    const AllOrders = await db.orders.findAll();

    console.log("getAll: " + AllOrders);
    res
    .status(200)
    .send(AllOrders.map(({OrderID, Status}) => {return{OrderID, Status}})); 
}

exports.getById =
async (req, res) => {
    const order = await getOrder(req, res);

    if (!order) {return res.status(404).send({error: 'Order not found'});}
    
    return res.status(200).send(order);
}

exports.deleteById =
async (req, res) => {
    const orderToBeDeleted = await getOrder(req, res);
    if (!orderToBeDeleted) {return res.status(404).send({error: 'Order not found'});}

    await orderToBeDeleted.destroy();
    res.status(204).send({error: "No Content"});
}

exports.modifiyById =
async (req, res) => {
    const orderToBeModified = await getOrder(req, res);
    if (!orderToBeModified) {return res.status(404).send({error: 'Order not found'});}
    console.log("Status: ", req.body.Status)
    console.log("Status check: ", !req.body.Status)
    if(orderToBeModified.Status === req.body.Status || isNaN(req.body.Status))
        {return res.status(400).send({error: 'No new parameters given or they are invalid.'})};
    orderToBeModified.Status = req.body.Status;
    await orderToBeModified.save();

    return res.location(`${Utilities.getBaseUrl(req)}/orders/${orderToBeModified.OrderID}`)
    .sendStatus(201).send(orderToBeModified);
    
}

const getOrder =
async (req, res) => {    
    const id = req.params.OrderID;
    console.log(id)
    const order = await db.orders.findByPk(id, {
        include: [{model: Product}]
    });

    if(!order) {
        res.status(404).send({error: `Order with ID ${id} not found.`});
        return null;
    }
    return order;
}