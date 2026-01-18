const ProductsController = require("../controllers/ProductsController");
const CategoryController = require("../controllers/CategoryController");
const UserController = require("../controllers/UserContoller");
const DescriptionsController = require("../controllers/DescriptionsController");
const OrdersController = require("../controllers/OrdersController");
const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");




module.exports = (app) => {

    app.post('/auth/register', AuthController.register);
    app.post('/auth/login', AuthController.login);
    app.post('/auth/logout', AuthController.logout);

    app.route("/products")
    .get(ProductsController.getAll)
    .post(ProductsController.create);

    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
    .delete(ProductsController.deleteById)
    .put(ProductsController.modifyById);

    app.route('/categorys')
    .post(CategoryController.create)
    .get(CategoryController.getAll);

    app.route("/categorys/:CategoryID")
    .delete(CategoryController.deleteById)
    .get(CategoryController.getCategoryByID)
    .put(CategoryController.updateCategoryByID);

    app.route('/users')
    .get(UserController.getAll)
    .post(UserController.createUser);

    app.route('/users/:UserID')
    .get(UserController.getUserByID)
    .put(UserController.updateUserByID)
    .delete(UserController.deleteUserByID);

    app.route("/descriptions")
    .get(DescriptionsController.getAll)
    .post(DescriptionsController.create);

    app.route("/descriptions/:DescriptionID")
    .get(DescriptionsController.getByID)
    .put(DescriptionsController.modifyById)
    .delete(DescriptionsController.deleteById);

    app.route("/orders")
    .get(OrdersController.getAll)
    .post(OrdersController.create);

    app.route("/orders/:OrderID")
    .delete(OrdersController.deleteById)
    .put(OrdersController.modifiyById)
    .get(OrdersController.getById);

    
}