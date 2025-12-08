const ProductsController = require("../controllers/ProductsController");

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
    .post(ProductsController.create);
    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
    .delete(ProductsController.deleteById);
}