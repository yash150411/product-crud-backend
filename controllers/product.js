const Product = require('../models/product');
const logger = require('tracer').colorConsole();

class ProductCtrl  {

  async addProduct (req, res){
    try{
      const product = req.body;
      const newProduct = await new Product(product).save();
      const id = newProduct._id;
      res.status(201).json({id, status: true, message: 'Product Added' });
    }catch(e){
      logger.log(e);
      res.status(400).json({status:false, error: e.message, e});
    }
  }

  async editProduct (req, res){
    try{
      console.log(req.body);   
      let data = req.body;
      delete data['productImage'];
      const filter = {_id: req.body._id};
      const obj = await Product.findOneAndUpdate(filter, data);
      res.send({status:true, obj});
    }catch(e){
      logger.log(e);
      res.status(400).json({message:e.message})
    }
  }

  async deleteProduct (req,res){
    try{
      const filter = {_id: req.body._id};
      const obj = await Product.findOneAndUpdate(filter, {isDeleted: 1});
      res.send({status:true, obj});
    }catch(e){
      logger.log(e);
      res.status(400).json({message:'Invalid Product ID'})
    }
  }

  async getAllProducts (req,res){
    try{
      let { pageNo, sortField, sort } = req.query;
      if(!pageNo) pageNo = 0;
      if(!sortField) sortField = 'createdAt';
      if(!sort) sort = -1;
      const limit = 10;
      let skip = limit * pageNo;
      const products = await Product.aggregate([
        {$match: {isDeleted: 0}},
        {$sort: {[sortField]: Number(sort)}},
        {$facet: {
          results: [{ $skip: skip }, { $limit: Number(limit) }],
          totalCount: [
            {$count: 'count'}
          ]
        }
      }
      ]);
      res.status(200).json({products: products[0].results, totalCount: products[0].totalCount[0].count});
    }catch(e){
      logger.log(e);
      res.status(400).json({message: 'Invalid Search Query'});
    }
  }

  // To be removed later
  async saveManyProducts (req,res){
    for(let i = 1; i <= 100; i++){
      console.log(i);
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