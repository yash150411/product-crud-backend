const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

const productCtrl = new ProductController();

router.route('/get-all-products').get(productCtrl.getAllProducts);
router.route('/add-product').post(productCtrl.addProduct);
router.route('/edit-product').patch(productCtrl.editProduct);
router.route('/delete-product').delete(productCtrl.deleteProduct);

// To be removed later
router.route('/add-many-product').post(productCtrl.saveManyProducts);

module.exports = router;