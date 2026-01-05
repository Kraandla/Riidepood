module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Orders', {
            OrderID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID,
            },
            Status: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
            },
        })
    console.log(Order === sequelize.models.Order);
    return Order;
}