const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())
require("./database/index.js")
const PORT = 3000;
const userroute = require("./routes/user")
const productsRoute = require("./routes/AllProducts.js")


app.use("/user" , userroute)
app.use("/api/products", productsRoute);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); 



