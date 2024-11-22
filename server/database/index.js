const { Sequelize  } = require('sequelize');


const sequelize = new Sequelize('e-commerce', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql' 
});

sequelize
 .authenticate()
 .then(() => {
  console.log("DATABASE CONNECTED");
 })
 .catch((err) => {
  console.log(err);
 });


const db ={}
db.sequelize = sequelize 
db.Sequelize = Sequelize
db.brands = require("./models/brands")(sequelize , Sequelize)
db.cart = require("./models/cart")(sequelize , Sequelize)
db.products = require("./models/products")(sequelize , Sequelize)
db.user = require("./models/user")(sequelize , Sequelize)
db.posts = require("./models/posts")(sequelize, Sequelize)


db.user.hasOne(db.cart)
db.cart.belongsTo(db.user)

db.cart.belongsToMany(db.products, { through: 'CartProducts' })
db.products.belongsToMany(db.cart, { through: 'CartProducts' })

db.brands.hasMany(db.products)
db.products.belongsTo(db.brands)

db.user.hasMany(db.posts)
db.posts.belongsTo(db.user)





//   sequelize.sync({alter : true}).then(() => {
//  console.log(' table created successfully!');
//  }).catch((error) => {
//   console.error('Unable to create table : ', error);
//  });


module.exports= db

