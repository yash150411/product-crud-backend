const Product = require('../models/product');

class ProductCtrl  {

  async addProduct (req, res){
    try{
      const product = req.body;
      const newProduct = await new Product(product).save();
      const id = newProduct._id;
      res.status(201).json({id, status: true, message: 'Product Added' });
    }catch(e){
      res.status(400).json({status:false, error: e.message, e});
    }
  }

  async editProduct (req, res){
    try{
      const filter = {_id: req.body._id};
      const obj = await Product.findOneAndUpdate(filter, req.body);
      res.send({status:true, obj});
    }catch(e){
      res.status(400).json({message:e.message})
    }
  }

  async deleteProduct (req,res){
    try{
      const filter = {_id: req.body._id};
      const obj = await Product.findOneAndUpdate(filter, {isDeleted: 1});
      res.send({status:true, obj});
    }catch(e){
      res.status(400).json({message:'Invalid Product ID'})
    }
  }

  async getAllProducts (req,res){
    try{
      let { pageNo, limit, sortType, sort } = req.query;
      if(!pageNo) pageNo = 1;
      if(!limit) limit = 15;
      if(!sortType) sortType = 'createdAt';
      if(!sort) sort = -1;
      const size = 15;
      const skip = size * (pageNo - 1);
      const products = await Product.aggregate([
        {$sort: {[sortType]: Number(sort)}},
        {$skip: skip},
        {$limit: Number(limit)},
      ]);
      res.status(200).json(products);
    }catch(e){
      res.status(400).json({message: 'Invalid Search Query'});
    }
  }

  // To be removed later
  async saveManyProducts (req,res){
    for(let i = 1; i <= 25; i++){
      let p = {
        productName: `product ${i}`,
        description: `description ${i}`,
        price: i,
        quantity: i
      }
      await new Product(p).save();
    }
    res.status(200).json(true);
  }

}

module.exports =  ProductCtrl;