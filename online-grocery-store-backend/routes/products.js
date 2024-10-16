const express = require('express');
const router = express.Router();
const db = require('../mysql');  // Your MySQL connection

// Fetch all products
router.get('/', (req, res) => {
  const sql = 'SELECT ProductID, ProductName, Price, StockQuantity, ImageURL FROM products';
  console.log("fetched products")
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching products.');
    }
    res.json(results);  // Send the fetched products as JSON
  });
});

module.exports = router;

