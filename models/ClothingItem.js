module.exports = (sequelize, DataTypes) => {
    const ClothingItem = sequelize.define(
    'Clothes', {
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
    console.log(ClothingItem === sequelize.models.ClothingItem);
    return ClothingItem;
}