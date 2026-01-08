const ProductsController = require("../controllers/ProductsController");
const DescriptionsController = require("../controllers/DescriptionsController");
const OrdersController = require("../controllers/OrdersController");

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
    .post(ProductsController.create);

    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
    .delete(ProductsController.deleteById)
    .put(ProductsController.modifyById);


    app.route("/descriptions")
    .get(DescriptionsController.getAll)
    .post(DescriptionsController.create);

    app.route("/descriptions/:DescriptionID")
    .get(DescriptionsController.getByID)
    .put(DescriptionsController.modifyById)
    .delete(DescriptionsController.deleteById);

    app.route("/orders")
    .post(OrdersController.create);
}