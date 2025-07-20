const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: [0, "El valor no puede ser menor que 0"],
  },

  description: {
    type: String,
    required: true,
  },

  sizes: {
    type: [String],
    enum: ["S", "M", "L", "XL"],
    default: ["S", "M", "L", "XL"],
  },
  colors: {
    type: [String],
    required: true,
    validate: [arrayMinLenght, "Debe de tener un color minimo"],
  },
  brand: {
    type: String,
    required: true,
  },
});

function arrayMinLenght(arr) {
  return arr.length > 0;
}

const Product = mongoose.model("Product", productSchema, "Products");
module.exports = Product;
