const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productName: {type: String, lowercase: true, trim: true, required:true},
  description: {type: String, trim: true, required:true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  isDeleted: {type: Number, default: 0, required: true, enum:[0,1]}
},{timestamps:true});

module.exports = mongoose.model('Products', productsSchema);