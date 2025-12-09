module.exports =(sequelize, DataTypes) => {
    const Category = sequelize.define(
    'Categorys', {
            CategoryID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV7,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Image:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            // ProductId:{
            //     type: DataTypes.UUID,
            //     allowNull: false,
            // }
    })
    console.log(Category === sequelize.models.Category);
    return Category;
    
}