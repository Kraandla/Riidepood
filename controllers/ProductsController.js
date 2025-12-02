const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');

exports.getAll =
async (req, res) => {
    const Allproducts = await db.products.findAll();
    console.log("getAll: " + Allproducts);
    res
    .status(200)
    .send(Allproducts.map(({ProductID, Name, Price}) => {return{ProductID, Name, Price}}));
}

exports.getByID = 
async (req, res) => {
    const Product = await getProduct(req, res);
    
    if (!Product) {return res.status(404).send({error: 'Product not found'});}
    
    return res.status(200).send(Product);
}



exports.create =
async (req, res) => {
    if (
        !req.body.Name ||
        !req.body.Price ||
        isNaN(req.body.Price)
    ){
    return res.status(400).send({error: 'Missing some parameters or they are invalid.'});
    }
    const newProduct = {
        ProductID: UUID.uuidv7(),
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.body.Image || null,
    }

    const createdProduct = await db.products.create(newProduct);
    return res
    .location
    (`${Utilities.getBaseUrl(req)}/products/${createdProduct.ProductID}`)
    .sendStatus(201);
}

const getProduct =
async (req, res) => {
    const idNumber = req.params.ProductID;

    // if(NaN(idNumber)) {
    //     res.status(400).send({error: `Entered ID is not valid. ID number: ${idnumber}`});
    //     return null;
    // }

    const product = await db.products.findByPk(idNumber);
    if(!product) {
        res.status(404).send({error: `Product with ID ${idNumber} not found.`});
        return null;
    }
    return product;
}