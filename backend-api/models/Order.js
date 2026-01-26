module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Orders', {
            OrderID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID,
            },
            UserID: {
                type: DataTypes.UUID,
                allowNull: true,  // or false if required
                references: {
                    model: 'Users',
                    key: 'UserID'
                }
            },
            Status: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
            },
        });
    console.log(Order === sequelize.models.Order);
    return Order;
}