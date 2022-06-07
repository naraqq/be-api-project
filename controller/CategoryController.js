const category = require("../models/category");
const mongoose = require("mongoose");

const get_category = (req, res, next) => {
  category.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};

// router.get("/category", (req, res) => {});
const create_category = (req, res, next) => {
  const reqBody = req.body;
  console.log(JSON.stringify(req.body.name));
  let newCategory = new category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
  });
  newCategory
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /Category",
        createdProduct: data,
      });
    })
    .catch(next);
};
// router.post("/category", (req, res, next) => {});

const delete_category = (req, res, next) => {
  category
    .findByIdAndRemove({
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

// router.delete("/category/:id", (req, res) => {});

const update_category = (req, res, next) => {
  category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
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

// router.put("/update/:id", (req, res) => {});

module.exports = {
  get_category,
  create_category,
  update_category,
  delete_category,
};
