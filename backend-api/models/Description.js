module.exports = (sequelize, DataTypes) => {
    const Description = sequelize.define(
        'Descriptions', {
            DescriptionID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultCalue: DataTypes.UUID,
            },
            Material: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Size: {
                type: DataTypes.STRING,
                allowNull: false,
            }

        })
    console.log(Description === sequelize.models.Product);
    return Description;
}