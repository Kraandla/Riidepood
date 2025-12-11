const ProductsController = require("../controllers/ProductsController");
const CategoryController = require("../controllers/CategoryController");

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
    .post(ProductsController.create);
    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
    .delete(ProductsController.deleteById)

    app.route('/categorys')
    .post(CategoryController.create)
    .get(CategoryController.getAll);
    app.route('/categorys/:CategoryID')
    .delete(CategoryController.deleteById);
   
    
}