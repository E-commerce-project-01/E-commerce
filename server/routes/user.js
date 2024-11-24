const express = require("express");
const { signup, login, updateAvatar,getAllUsers, getuserbyid, deleteuserbyid } = require("../controllers/user");

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.put("/update-avatar", updateAvatar);
userRoute.get("/all", getAllUsers);
userRoute.get("/:id", getuserbyid);
userRoute.delete("/:id", deleteuserbyid);


module.exports = userRoute;
