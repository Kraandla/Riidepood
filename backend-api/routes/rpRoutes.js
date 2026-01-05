const ProductsController = require("../controllers/ProductsController");
const CategoryController = require("../controllers/CategoryController");
const UserController = require("../controllers/UserContoller");

module.exports = (app) => {
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
}