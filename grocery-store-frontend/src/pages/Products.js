import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (productID) => {
    const customerID = 1;  // Assuming customer ID is 1 for now
    const quantity = 1;  // Default quantity to add

    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerID, productID, quantity }),  // Dynamically pass productID
    })
      .then(response => {
        if (response.ok) {
          // Update stock on the frontend after adding to cart
          setProducts(products.map(product => 
            product.ProductID === productID ? 
            { ...product, StockQuantity: product.StockQuantity - quantity } : product
          ));
          alert('Product added to cart successfully!');
        } else {
          alert('Error adding product to cart.');
        }
      })
      .catch(error => console.error('Error adding product to cart:', error));
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.ProductID} className="product-item">
            <img src={product.ImageURL} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>Price: ${product.Price}</p>
            <p>Stock: {product.StockQuantity}</p>
            <button onClick={() => handleAddToCart(product.ProductID)} disabled={product.StockQuantity === 0}>
              {product.StockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

