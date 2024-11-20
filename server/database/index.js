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






//   sequelize.sync({alter : true}).then(() => {
//  console.log(' table created successfully!');
//  }).catch((error) => {
//   console.error('Unable to create table : ', error);
//  });


module.exports= db

