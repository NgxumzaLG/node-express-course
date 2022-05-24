const express = require('express');
const { products } = require('./data');

const app = express();

app.disable('etag');

app.get('/', (req, res) => {
    res.send('<h2>Home page</h2><a href="/api/products">API products</a>');

});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    });

    res.json(newProducts);

});

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find(product => product.id === Number(productID));
    if (!singleProduct) return res.status(404).send(`Product No. ${productID} Not Found`);
    // console.log(productID);
    
    res.json(singleProduct);

});

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) sortedProducts = sortedProducts.filter(product => product.name.startsWith(search));

    if (limit) sortedProducts = sortedProducts.slice(0, Number(limit));
        
    
    // console.log(req.query);
    res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
    res.send(`<h3>${req.url}</h3><h5>API not found</h5>`);

});

app.listen(5000, () => {
    console.log('server is listening on port 5000...');

});