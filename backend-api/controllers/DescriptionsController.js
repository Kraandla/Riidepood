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

exports.modifyById =
async (req, res) => {
    const descriptionToBeModified = await getDescription(req, res);

    if (!descriptionToBeModified) {return res.status(404).send({error: 'Product not found'});}

    //add control for updated values here
    if (
        (!req.body.Material && !req.body.Color && !req.body.Size) ||

        (   
        req.body.Material == descriptionToBeModified.Material &&
        req.body.Color == descriptionToBeModified.Color &&
        req.body.Size == descriptionToBeModified.Size
        )
    ){return res.status(400).send({error: 'No new parameters given or they are invalid.'})}


    if (!req.body.Material) 
    {
        req.body.Material = descriptionToBeModified.Material;
    } else {
        descriptionToBeModified.Material = req.body.Material;
    }

    if (!req.body.Color) {
        req.body.Color = descriptionToBeModified.Color;
    } else {
        descriptionToBeModified.Color = req.body.Color;
    }

    if (!req.body.Size) {
        req.body.Size = descriptionToBeModified.Size;
    } else {
        descriptionToBeModified.Size = req.body.Size;
    }

    await descriptionToBeModified.save();
    return res.location(`${Utilities.getBaseUrl(req)}/products/${descriptionToBeModified.DescriptionID}`)
    .sendStatus(201).send(descriptionToBeModified);

}

exports.deleteById =
async (req, res) => {
    const descriptionToBeDeleted = await getDescription(req, res);
    if (!descriptionToBeDeleted) {return res.status(404).send({error: 'Product not found'});}

    await descriptionToBeDeleted.destroy();
    res.status(204).send({error: "No Content"});
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