const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('../node_modules/uuidv7');
const Products = require('./ProductsController')

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
    const Product = await Products.getProduct(req, res);
    
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
        Description: req.body.DescriptionID || null
    }

    const createdProduct = await db.products.create(newProduct);
    return res
    .location
    (`${Utilities.getBaseUrl(req)}/products/${createdProduct.ProductID}`)
    .sendStatus(201);
}

exports.deleteById =
async (req, res) => {
    const productToBeDeleted = await Products.getProduct(req, res);
    if (!productToBeDeleted) {return res.status(404).send({error: 'Product not found'});}

    await productToBeDeleted.destroy();
    res.status(204).send({error: "No Content"});
}

exports.modifyById =
async (req, res) => {
    const productToBeModified = await Products.getProduct(req, res);

    if (!productToBeModified) {return res.status(404).send({error: 'Product not found'});}

    //add control for updated values here
    if (
        (!req.body.Name && !req.body.Price && !req.body.Image) ||

        (   
        req.body.Name == productToBeModified.Name &&
        req.body.Price == productToBeModified.Price &&
        req.body.Image == productToBeModified.Image
        )
    ){return res.status(400).send({error: 'No new parameters given or they are invalid.'})}


    if (!req.body.Name) 
    {
        req.body.Name = productToBeModified.Name;
    } else {
        productToBeModified.Name = req.body.Name;
    }

    if (!req.body.Price) {
        req.body.price = productToBeModified.Price;
    } else {
        productToBeModified.Price = req.body.Price;
    }

    if (!req.body.Price) {
        req.body.Image = productToBeModified.Image;
    } else {
        productToBeModified.Image = req.body.Image;
    }

    await productToBeModified.save();
    return res.location(`${Utilities.getBaseUrl(req)}/products/${productToBeModified.ProductID}`)
    .sendStatus(201).send(productToBeModified);

}

exports.getProduct =
async (req, res) => {
    console.log("getproduct body req:\n", req.body);
    console.log("is body null: ", req.body == null)
    console.log("getproduct params req:\n", req.params);
    
    let idNumber;
    //checks where to look for product ID
    //cus description create method doesnt get data in params
    if (req.body == null){
        idNumber = req.params.ProductID
    } else if (req.params == null) {
        idNumber = req.body.ProductID
    } else {
        res.status(400).send({error: "Request could not be read properly."});
        return null;
    }

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

