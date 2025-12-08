module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
    'Products', {
            ProductID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Price:{
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            Image: {
                type: DataTypes.STRING,
                allowNull: true,
            }
    })
    console.log(Product === sequelize.models.Product);
    return Product;
}