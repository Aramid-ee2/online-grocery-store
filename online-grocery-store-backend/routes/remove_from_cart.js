const express = require('express');
const router = express.Router();
const db = require('../mysql');

// Remove item from cart
router.post('/remove', (req, res) => {
  const { customerID, productID, quantity } = req.body;

  const increaseStockQuery = 'UPDATE products SET StockQuantity = StockQuantity + ? WHERE ProductID = ?';
  db.query(increaseStockQuery, [quantity, productID], (err) => {
    if (err) return res.status(500).send('Error updating stock.');

    const checkCartQuery = 'SELECT * FROM cart_items WHERE CartID = ? AND ProductID = ?';
    db.query(checkCartQuery, [customerID, productID], (err, cartResult) => {
      if (err) return res.status(500).send('Error checking cart.');

      if (cartResult.length > 0) {
        if (cartResult[0].Quantity > quantity) {
          // Reduce the quantity in the cart
          const updateCartQuery = 'UPDATE cart_items SET Quantity = Quantity - ? WHERE CartID = ? AND ProductID = ?';
          db.query(updateCartQuery, [quantity, customerID, productID], (err) => {
            if (err) return res.status(500).send('Error updating cart.');
            res.send('Cart updated successfully.');
          });
        } else {
          // Remove the product from the cart
          const deleteCartQuery = 'DELETE FROM cart_items WHERE CartID = ? AND ProductID = ?';
          db.query(deleteCartQuery, [customerID, productID], (err) => {
            if (err) return res.status(500).send('Error removing from cart.');
            res.send('Product removed from cart.');
          });
        }
      } else {
        res.status(400).send('Product not found in cart.');
      }
    });
  });
});

module.exports = router;
