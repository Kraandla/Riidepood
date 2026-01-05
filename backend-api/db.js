const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
        process.env.DB_DBNAME,
        process.env.DB_USERNAME,
        process.env.DB_USERPASS,
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        logging: console.log,
    }
);

async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully, yay!');
    } catch (error) {
        console.error("Unable to connect. " + error);
    }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = require('./models/Product.js')(sequelize, DataTypes, db.descriptions);
db.descriptions = require('./models/Description.js')(sequelize, DataTypes);

db.orders = require('./models/Order.js')(sequelize, DataTypes);

db.products.belongsTo(db.descriptions);
db.descriptions.hasOne(db.products);

db.products.belongsToMany(db.orders, {through: 'OrderProducts'});
db.orders.belongsToMany(db.products, {through: 'OrderProducts'});

const sync = (async () => {
    await sequelize.sync({alter: true});
    console.log('DB sync has been completed.');
});

module.exports = {db, sync};
