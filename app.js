const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('tracer').colorConsole();
const cors = require('cors');
const { setMongo } = require('./mongo');
const { setRoutes } = require('./routes');
const fileUpload = require('express-fileupload');
dotenv.config();

const allowedOrigins = ['http://localhost:3000', 'https://product-crud-frontend.vercel.app'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.set('port', (process.env.PORT || 3028));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

async function main() {
  try {
    await setMongo();
    setRoutes(app);
    app.listen(app.get('port'), () => logger.log(`Product CRUD Backend is listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

main();

module.exports = { app };