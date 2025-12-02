const {db} = require('../db');
const Utilities = require('./Utilities');

exports.getAll =
async (req, res) => {
    const clothes = await db.clothes.findAll();
    console.log("getAll: " + clothes);
    res
    .status(200)
    .send(clothes.map(({ClothingItemID, Name, Price}) => {return{ClothingItemID, Name, Price}}));
}

exports.getByID = 
async (req, res) => {
    const ClothingItem = await getClothingItem(req, res);
    
    if (!ClothingItem) {return res.status(404).send({error: 'Clothing item not found'});}
    
    return res.status(200).send(ClothingItem);
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
    const newClothingItem = {
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.body.Image || null,
    }

    const createdClothingItem = await db.clothes.create(newClothingItem);
    return res
    .location
    (`${Utilities.getBaseUrl(req)}/clothes/${createdClothingItem.ClothingItemId}`)
    .sendStatus(201);
}

const getClothingItem =
async (req, res) => {
    const idNumber = req.params.ClothingItemID;

    // if(NaN(idNumber)) {
    //     res.status(400).send({error: `Entered ID is not valid. ID number: ${idnumber}`});
    //     return null;
    // }

    const clothingItem = await db.clothes.findByPk(idNumber);
    if(!clothingItem) {
        res.status(404).send({error: `Clothing item with ID ${idNumber} not found.`});
        return null;
    }
    return clothingItem;
}