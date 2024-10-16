const express = require('express');
const router = express.Router();
const db = require('../mysql');  // Your MySQL connection


// Add item to cart
router.post('/', (req, res) => {  // Mounted at /cart/add in server.js
  const { customerID, productID, quantity } = req.body;
  console.log('Request body:', req.body); 

  // Check if the product is in stock
  const checkStockQuery = 'SELECT StockQuantity FROM products WHERE ProductID = ?';
  db.query(checkStockQuery, [productID], (err, result) => {
    if (err) return res.status(500).send('Error checking stock.');

    const stockQuantity = result[0].StockQuantity;

    // Check if there is enough stock
    if (stockQuantity >= quantity) {
      // Reduce stock in products table
      const reduceStockQuery = 'UPDATE products SET StockQuantity = StockQuantity - ? WHERE ProductID = ?';
      db.query(reduceStockQuery, [quantity, productID], (err) => {
        if (err) return res.status(500).send('Error updating stock.');

        // Check if the product is already in the cart
        const checkCartQuery = 'SELECT * FROM cart_items WHERE CartID = ? AND ProductID = ?';
        db.query(checkCartQuery, [customerID, productID], (err, cartResult) => {
          if (err) return res.status(500).send('Error checking cart.');

          if (cartResult.length > 0) {
            // Product already in cart, update the quantity
            const updateCartQuery = 'UPDATE cart_items SET Quantity = Quantity + ? WHERE CartID = ? AND ProductID = ?';
            db.query(updateCartQuery, [quantity, customerID, productID], (err) => {
              if (err) return res.status(500).send('Error updating cart.');
              res.send('Cart updated successfully.');
            });
          } else {
            // Product not in cart, insert a new record
            const addToCartQuery = 'INSERT INTO cart_items (CartID, ProductID, Quantity) VALUES (?, ?, ?)';
            db.query(addToCartQuery, [customerID, productID, quantity], (err) => {
              if (err) return res.status(500).send('Error adding to cart.');
              res.send('Product added to cart successfully.');
            });
          }
        });
      });
    } else {
      res.status(400).send('Not enough stock available.');
    }
  });
});

module.exports = router;





  