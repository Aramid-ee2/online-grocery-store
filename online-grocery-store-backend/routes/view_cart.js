const express = require('express');
const router = express.Router();
const db = require('../mysql');

// View cart
router.get('/:customerID', (req, res) => {
  const customerID = req.params.customerID;

  const viewCartQuery = `
    SELECT p.ProductName, p.Price, ci.Quantity, (p.Price * ci.Quantity) AS Subtotal
    FROM cart_items ci
    JOIN products p ON ci.ProductID = p.ProductID
    WHERE ci.CartID = ?
  `;
  
  db.query(viewCartQuery, [customerID], (err, results) => {
    if (err) return res.status(500).send('Error retrieving cart.');
    res.json(results);
  });
});

module.exports = router;
