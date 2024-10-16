const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({origin: "*"}));  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse incoming JSON requests

// Import route handlers
const productsRoute = require('./routes/products');
const addToCart = require('./routes/cart');  // Directly import cart handlers
const removeFromCart = require('./routes/remove_from_cart');
const viewCart = require('./routes/fetch_cart_items');

// Use routes
console.log('Route /products mounted');
app.use('/products', productsRoute);  // Route for products


// Cart-related routes
app.use('/add', addToCart);
console.log('Route /add mounted');
// app.use('/add', addToCart);
app.use('/cart/remove', removeFromCart);  // Route for removing from cart
app.use('/cart/view', viewCart);      // Route for viewing the cart

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
