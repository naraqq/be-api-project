const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");
const FoodController = require("../controller/FoodController");
const authController = require("../controller/authController");
const UserController = require("../controller/UserController");
const auth = require("../middleware/auth");

//CATEGORY
router.get("/category", auth, CategoryController.get_category);
router.post("/category", auth, CategoryController.create_category);
router.delete("/category/:id", auth, CategoryController.delete_category);
router.put("/update/:id", auth, CategoryController.update_category);

//FOOD
router.get("/food", auth, FoodController.get_food);
router.post("/food", auth, FoodController.create_food);
router.put("/updatefood/:id", auth, FoodController.update_food);
router.delete("/food/:id", auth, FoodController.delete_food);

//AUTH
router.post("/user/login", authController.login);
router.post("/user/register", authController.register);

//USER
router.post("/user/register", UserController.create_user);

module.exports = router;
