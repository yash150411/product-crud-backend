const mongoose = require('mongoose');
const logger = require('tracer').colorConsole();

const setMongo = async () => {
  const mongodbURI = process.env.MONGODB_URI;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);
  await mongoose.connect(mongodbURI);
  logger.log('Connected to MongoDB');
};

module.exports = {setMongo};