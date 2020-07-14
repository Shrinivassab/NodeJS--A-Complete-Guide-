const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-products', (req, res, next) => {
    // console.log('In the middleware!');
    // res.send('<form action="/admin/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    // res.send('<h1>Products added</h1>');
    // next(); // Allows the request to continue to the next middleware in line
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
