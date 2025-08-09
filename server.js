require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'phones',
    price: 1299,
    link: 'https://example.com/iphone-15-pro'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    category: 'phones',
    price: 1099,
    link: 'https://example.com/galaxy-s24'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: 'accessories',
    price: 249,
    link: 'https://example.com/airpods-pro'
  },
  {
    id: 4,
    name: 'MacBook Air M3',
    category: 'laptops',
    price: 1599,
    link: 'https://example.com/macbook-air-m3'
  }
];

app.get('/api/products', (req, res) => {
  const search = req.query.search;
  const category = req.query.category;

  let filtered = products;

  if (search) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
