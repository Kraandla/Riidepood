const ClothesController = require("../controllers/ClothesController");

module.exports = (app) => {
    app.route("/clothes")
    .get(ClothesController.getAll);
}