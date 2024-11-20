const {getbrands } = require("../controllers/brands")

const express = require("express")

const brandsroute = express.Router()
brandsroute.get("/allbrands" , getbrands)


module.exports = brandsroute