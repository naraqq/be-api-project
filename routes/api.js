const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");
const FoodController = require("../controller/FoodController");
const authController = require("../controller/authController");
// const UserController = require("../controller/UserController");

//CATEGORY
router.get("/category", CategoryController.get_category);
router.post("/category", CategoryController.create_category);
router.delete("/category/:id", CategoryController.delete_category);
router.put("/update/:id", CategoryController.update_category);

//FOOD
router.get("/food", FoodController.get_food);
router.post("/food", FoodController.create_food);
router.put("/updatefood/:id", FoodController.update_food);
router.delete("/food/:id", FoodController.delete_food);

//USER
router.post("/user/register", authController.register);
module.exports = router;
