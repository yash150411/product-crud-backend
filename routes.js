const productRoutes = require('./routes/product');

async function setRoutes(app) {  
  app.use('/api/product/', productRoutes);
};

module.exports = {setRoutes};