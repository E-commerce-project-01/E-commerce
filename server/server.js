const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
require("./database/index.js")
const PORT = 3000;
const brandsroute = require("./routes/brands.js")


app.use("/brands" , brandsroute)
app.use("/user" , )
app.use("/" , )
app.use("/" , )
app.use("/" , )
app.use("/" , )


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});