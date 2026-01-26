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
db.products = require('./models/Product.js')(sequelize, DataTypes, db.categorys);
db.categorys = require('./models/Category.js')(sequelize, DataTypes);
db.descriptions = require('./models/Description.js')(sequelize, DataTypes);
db.users = require('./models/User.js')(sequelize, DataTypes);

db.products.hasOne(db.categorys);
db.categorys.hasMany(db.products);
db.orders = require('./models/Order.js')(sequelize, DataTypes, db.products);
// db.orderedProducts = require("./models/OrderedProducts.js")(sequelize, DataTypes, db.products, db.orders)

db.products.belongsTo(db.descriptions);
db.descriptions.hasOne(db.products);


db.products.belongsToMany(db.orders, {through: 'OrderedProducts'});
db.orders.belongsToMany(db.products, {through: 'OrderedProducts'});

db.users.hasMany(db.orders, { foreignKey: 'UserID' });
db.orders.belongsTo(db.users, { foreignKey: 'UserID' });

const sync = (async () => {
    await sequelize.sync({alter: true});
    console.log('DB sync has been completed.');
});

module.exports = {db, sync};
