const ClothesController = require("../controllers/ClothesController");

module.exports = (app) => {
    app.route("/clothing")
    .get(ClothesController.getAll);
    app.route("/clothing/:ClothingItemID")
    .get(ClothesController.getByID);
}