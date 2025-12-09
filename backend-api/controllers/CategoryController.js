const { db } = require("../db.js");
const Utilities = require("./Utilities.js");
const UUID = require("../node_modules/uuidv7");

exports.create = async (req, res) => {
  if (!req.body.Name || !req.body.Image) {
    return res.status(400).send({ error: "Missing some parameters." });
  }
    if (req.body.ProductId) {
    return res.status(404).send({ error: "ProductID  is not found." });
  }

  const newCategory = {
    CategoryID: UUID.uuidv7(),
    Name: req.body.Name,
    Image: req.body.Image || null,
    ProductId: req.body.ProductId,
  };


  const createdCategory = await db.categorys.create(newCategory);
  return res
    .location(`${Utilities.getBaseUrl(req)}/categorys/${createdCategory.CategoryID}`)
    .sendStatus(201);

};
