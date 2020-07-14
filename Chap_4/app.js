const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-products', (req, res, next) => {
    // console.log('In the middleware!');
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    // res.send('<h1>Products added</h1>');
   // next(); // Allows the request to continue to the next middleware in line
});

app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    // console.log('In another middleware!');
    res.send('<h1>Hello form express</h1>');
});

// const server = http.createServer(app);

app.listen(3000);
