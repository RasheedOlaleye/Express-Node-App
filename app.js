const express = require('express');
const cors= require('cors')
const app = express();
//const RouteHandler= require('./app/routes/products.Routes')
const router = require('./app/routes/products.Routes');
const config = require("./app/config/db.config");



var Optional = {
    origin: 'https://localhost:3000'
};

app.use(cors(Optional));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({"Welcome": "Welcome to Nodejs and mysql Server application"});
})
//require("./app/routes/product.Routes.js")(app);
//app.use('/', RouteHandler)
app.use('/api/product', router)

// Mount point for the apis starting with /oauth
const PORT =process.env.PORT||3000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// catch 404 and forward to error handler
 app.use((req, res) => {
  console.error(`Requested resource ${req.method} ${req.url} not found..!`);
  
  res.status(404).send(`Resource not found..!`);
});

module.exports = server;