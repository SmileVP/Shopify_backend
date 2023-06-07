var express = require("express");
var router = express.Router();
//Mongoose to manage relationships between data, has schema validation
const mongoose = require("mongoose");

const { dbUrl } = require("../config/dbConfig");
const { ProductModel } = require("../schema/productSchema");

//to connect to db
mongoose.connect(dbUrl);

//to create new products
router.post("/create-products", async (req, res) => {
  try {
    let products = await ProductModel.findOne({ name: req.body.name });
    if (!products) {
      let doc = new ProductModel(req.body);
      await doc.save();
      res.status(201).send({
        message: "Product added successfully",
      });
    } else {
      res.status(400).send({
        message: "Product already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

//to get all the product details
router.get("/product-details", async (req, res) => {
  try {
    let products = await ProductModel.find();
    res.status(200).send({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
