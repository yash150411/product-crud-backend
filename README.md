# Product CRUD Backend

This is CRUD application backend built on NodeJS, ExpressJS, Mongodb

To get Start

Please note Node JS, Mongodb should be install in your local PC

- Open your terminal and type

git clone https://github.com/yash150411/product-crud-backend.git

cd product-crud-backend

npm i

- Now as we have cloned the repository and installed the dependencies we need to export environment variable. So for that

### Create a .env file in your project root and then export envrinment variable

### Environment variable to be exported are :-

- MONGODB_URI=yourMongoDbUrlGoesHere

### Copy the environment given above in your .env file with your own credential

### For MONGODB_URI environment variable you can use http://localhost:27017 but for this you must have mongodb installed and configured in your local PC orlese you can put a link of Mongodb Atlas

## So now as the environment variables are set you can run the start script for development environment

- npm run start:dev

### This will start the server on port 3028

## Yeah! Now you should be seeing a message in your console

- Connected to MongoDB
- Product CRUD Backend is listening on port 3028
