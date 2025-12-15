const ProductsController = require("../controllers/ProductsController");
const DescriptionsController = require("../controllers/DescriptionsController")

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
    .post(ProductsController.create);

    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
    .delete(ProductsController.deleteById)
    .put(ProductsController.modifyById);

    
    app.route("/descriptions")
    .post(DescriptionsController.create);

    app.route("/descriptions/:DescriptionID")
    .get(DescriptionsController.getByID);
}