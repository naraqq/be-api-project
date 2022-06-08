const Food = require("../models/Food");
const mongoose = require("mongoose");

const get_food = (req, res, next) => {
  Food.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};

// router.get("/food", (req, res) => {});

const create_food = (req, res, next) => {
  const reqBody = req.body;
  console.log(JSON.stringify(req.body.name));
  let newFood = new Food({
    _id: new mongoose.Types.ObjectId(),
    sales: req.body.sales,
    _id: req.body._id,
    category_id: req.body.category_id,
    name: req.body.name,
    price: req.body.price,
    portion: req.body.portion,
    stock: req.body.stock,
    image: req.body.image,
    tumb_img: req.body.tumb_img,
    ingredients: req.body.ingredients,
    discount: req.body.discount,
    category: req.body.category,
  });
  newFood
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /Category",
        createdProduct: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "Handling POST requests to /products",
      });
    });
};

// router.post("/food", (req, res, next) => {});

const delete_food = (req, res, next) => {
  Food.findByIdAndRemove({
    _id: req.params.id,
  })
    .then((data) => {
      console.log("deleting object: " + data);
      return res.json({
        data: data,
      });
    })
    .catch(() => {
      console.log(err);
    });
};
// router.delete("/food/:id", (req, res) => {});

const update_food = (req, res, next) => {
  Food.findByIdAndUpdate(
    req.params.id,
    {
      sales: req.body.sales,
      _id: req.body._id,
      category_id: req.body.category_id,
      name: req.body.name,
      price: req.body.price,
      portion: req.body.portion,
      stock: req.body.stock,
      image: req.body.image,
      tumb_img: req.body.tumb_img,
      ingredients: req.body.ingredients,
      discount: req.body.discount,
      category: req.body.category,
    },
    {
      new: true,
    },
    (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      } else if (!data) {
        res.json({
          success: false,
          message: "Not Found",
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    }
  );
};
// router.put("/updatefood/:id", (req, res) => {});

module.exports = {
  get_food,
  create_food,
  delete_food,
  update_food,
};
