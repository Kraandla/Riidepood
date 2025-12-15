const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');
const Products = require('./ProductsController')

exports.create =
async (req, res) => {
    //checks if any of the parameters are missing
    //sends an error code if true
    console.log("desc create req:\n", req.body)
    if (
        !req.body.ProductID ||
        !req.body.Material ||
        !req.body.Color ||
        !req.body.Size
    ){
        return res.status(400).send({error: 'Missing some parameters or they are invalid.'});
    }

    //checks the database for the product
    //if the method returns a null value then create method returns nothing
    const product = await Products.getProduct(req, res);

    if (product == null) {
        return  null;
    }

    //checks if the product has a description
    if (product.DescriptionDescriptionID !== null){
        return res.status(400).send({error: 'A description for the selected product already exists.'});        
    }

    const newDescription = {
        DescriptionID: UUID.uuidv7(),
        Material: req.body.Material,
        Color: req.body.Color,
        Size: req.body.Size
    }

    const createdDescription = await db.descriptions.create(newDescription);
    
    product.DescriptionDescriptionID = newDescription.DescriptionID;
    console.log(product);
    await product.save();

    return res.location(`${Utilities.getBaseUrl(req)}/descriptions/${createdDescription.DescriptionID}`)
    .sendStatus(201);
}

exports.getByID = 
async (req, res) => {
    const Description = await getDescription(req, res);
    
    if (!Description) {return res.status(404).send({error: 'Description not found'});}
    
    return res.status(200).send(Description);
}

getDescription =
async (req, res) => {
    const idNumber = req.params.DescriptionID

    const description = await db.descriptions.findByPk(idNumber);
    if (!description) {
        res.status(404).send({error: `Description with ID ${idNumber} not found`});
        return null
    }
    return description;
}