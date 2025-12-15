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
    Image: req.body.Image,
    ProductProductID: req.body.ProductID || null,
  };


  const createdCategory = await db.categorys.create(newCategory);
  return res
    .location(`${Utilities.getBaseUrl(req)}/categorys/${createdCategory.CategoryID}`)
    .sendStatus(201);

};

exports.deleteById = async (req, res) => {
  const categoryToBeDeleted = await getCategory(req, res);
  if (!categoryToBeDeleted) {
    return res.status(404).send({ error: "Category not found" });
  }
  await categoryToBeDeleted.destroy();
  res.status(204).send({ error: "No Content" });
}

exports.getAll = async (req, res) => {
    const Allcategorys = await db.categorys.findAll();
    console.log("getAll: " + Allcategorys);
    res
    .status(200)
    .send(Allcategorys.map(({CategoryID, Name, Image}) => {return{CategoryID, Name, Image}}));
};

exports.updateCategoryByID = async (req, res) => {
  const categoryToBeModified = await getCategory(req, res);
  if (!categoryToBeModified) {
    return res.status(404).send({ error: "Category not found" });
  }
  if ((!req.body.Name && !req.body.Image)||
      (req.body.Name === categoryToBeModified.Name || req.body.Image === categoryToBeModified.Image)) {
    return res.status(400).send({ error: "No new parameters given or they are invalid." });
  }
  if(!req.body.Name) {
    req.body.Name = categoryToBeModified.Name;
  }else{
    categoryToBeModified.Name = req.body.Name;
  }
  if(!req.body.Image) {
    req.body.Image = categoryToBeModified.Image;
  }else{
    categoryToBeModified.Image = req.body.Image;
  }

  await categoryToBeModified.save();
  return res.location(`${Utilities.getBaseUrl(req)}/categorys/${categoryToBeModified.CategoryID}`)
  .sendStatus(201).send(categoryToBeModified);

};


const getCategory = async (req, res) => {
  const CategoryID = req.params.CategoryID;
  const category = await db.categorys.findByPk(CategoryID);
  if (!category) {
    res.status(404).send({ error: `Category with ID ${CategoryID} not found` });
    return null;
  }
  return category;
};

exports.getCategoryByID = async (req, res) => {
  const Category = await getCategory(req, res);
  if (!Category) {
    return res.status(404).send({ error: "Category not found" });
  }
  return res.status(200).send(Category);

};