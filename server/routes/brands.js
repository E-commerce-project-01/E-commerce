const {getbrands,deletebrand } = require("../controllers/brands")

const express = require("express")

const brandsroute = express.Router()
brandsroute.get("/allbrands" , getbrands)
brandsroute.delete("/delete/:id" , deletebrand)




module.exports = brandsroute