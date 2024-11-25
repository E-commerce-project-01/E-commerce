const express = require("express");
const { signup, login, updateAvatar, getAllUsers } = require("../controllers/user");

const userRoute = express.Router();


userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.put("/update-avatar", updateAvatar);
userRoute.get("/users", getAllUsers);
module.exports = userRoute;
