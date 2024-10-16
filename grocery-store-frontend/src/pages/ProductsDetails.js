import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)  // Fetch the product by ID
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h2>{product.ProductName}</h2>
      <img src={product.ImageURL} alt={product.ProductName} style={{ width: '300px' }} />
      <p>Price: ${product.Price}</p>
      <p>Stock: {product.StockQuantity}</p>
      <p>Description: {product.Description}</p>
    </div>
  );
}

export default ProductDetails;
