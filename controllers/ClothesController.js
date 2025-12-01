const {db} = require('../db');
const Utilities = require('./Utilities');

exports.getAll =
async (req, res) => {
    const clothes = await db.clothes.findAll();
    console.log("getAll: " + clothes);
    res
    .status(200)
    .send(clothes.map(({ClothingItemID, Name, Price, Image}) => {return{ClothingItemID, Name}}));
}