const express = require("express");
const { signup, login, updateAvatar, updateName } = require("../controllers/user");

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.put("/update-avatar", updateAvatar);
userRoute.put("/update-name", updateName);

module.exports = userRoute;
