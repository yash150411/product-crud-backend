const productRoutes = require('./routes/product');
const imageRoutes = require('./routes/images');

async function setRoutes(app) {  
  app.use('/api/product/', productRoutes);
  app.use('/api/image', imageRoutes);
};

module.exports = {setRoutes};