const { Model } = require('sequelize');
const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuidv7');
const Product = db.products

exports.create =
async (req, res) => {
    console.log(req.body)
    if (!req.body.Products) {
        return res.status(400).send({error: 'Missing products in order.'});
    }
    const newOrder = {
        OrderID: UUID.uuidv7(),
        Status: false,
        UserID: req.user?.UserID || null,
    };

    const createdOrder = await db.orders.create(newOrder);
    await createdOrder.addProducts(req.body.Products);

    return res
    .location(`${Utilities.getBaseUrl(req)}/orders/${createdOrder.OrderID}`)
    .sendStatus(201);
}

exports.getAll =
async (req, res) => {
    try {
        // If admin, show all orders. If regular user, show only their orders
        const whereClause = req.user.IsAdmin ? {} : { UserID: req.user.UserID };
        
        const AllOrders = await db.orders.findAll({
            where: whereClause,
            include: [{model: Product}]
        });

        console.log("getAll: " + AllOrders);
        res.status(200).send(AllOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({error: 'Failed to fetch orders'});
    }
}

exports.getById =
async (req, res) => {
    const order = await getOrder(req, res);

    if (!order) {return res.status(404).send({error: 'Order not found'});}
    
    // Check if user owns the order or is admin
    if (!req.user.IsAdmin && order.UserID !== req.user.UserID) {
        return res.status(403).send({error: 'Access denied'});
    }
    
    return res.status(200).send(order);
}

exports.deleteById =
async (req, res) => {
    const orderToBeDeleted = await getOrder(req, res);
    if (!orderToBeDeleted) {return res.status(404).send({error: 'Order not found'});}

    // Check if user owns the order or is admin
    if (!req.user.IsAdmin && orderToBeDeleted.UserID !== req.user.UserID) {
        return res.status(403).send({error: 'Access denied'});
    }

    await orderToBeDeleted.destroy();
    res.status(204).send({error: "No Content"});
}

exports.modifiyById =
async (req, res) => {
    const orderToBeModified = await getOrder(req, res);
    if (!orderToBeModified) {return res.status(404).send({error: 'Order not found'});}
    
    // Check if user owns the order or is admin
    if (!req.user.IsAdmin && orderToBeModified.UserID !== req.user.UserID) {
        return res.status(403).send({error: 'Access denied'});
    }
    
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