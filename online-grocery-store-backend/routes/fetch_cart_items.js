const express = require('express');
const router = express.Router();
const db = require('../mysql');

// Fetch cart items and calculate total
router.get('/:customerID', (req, res) => {
  const customerID = req.params.customerID;

  const cartQuery = `
    SELECT p.ProductName, p.Price, ci.Quantity, (p.Price * ci.Quantity) AS Subtotal
    FROM cart_items ci
    JOIN products p ON ci.ProductID = p.ProductID
    WHERE ci.CartID = ?
  `;
  
  db.query(cartQuery, [customerID], (err, results) => {
    if (err) return res.status(500).send('Error retrieving cart.');

    // Calculate total
    const total = results.reduce((sum, item) => sum + item.Subtotal, 0);
    res.json({ items: results, total });
  });
});

module.exports = router;

