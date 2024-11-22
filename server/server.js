const express = require("express");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json());

require("./database/index.js")
const PORT = 3000;
const brandsroute = require("./routes/brands.js")
const userRoute = require("./routes/user.js");
const productsRoute = require("./routes/AllProducts.js")
const cartRoute = require("./routes/cart.js");



app.use("/brands" , brandsroute)
app.use("/user", userRoute); 
app.use("/products", productsRoute);
app.use("/cart", cartRoute);




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



