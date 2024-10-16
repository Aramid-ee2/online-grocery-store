import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const customerID = 1;  // Assuming customer ID is 1 for now
    fetch(`http://localhost:3000/cart/${customerID}`)
      .then(response => response.json())
      .then(data => {
        setCartItems(data.items);
        setTotal(data.total);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.ProductName}>
                  <td>{item.ProductName}</td>
                  <td>${item.Price}</td>
                  <td>{item.Quantity}</td>
                  <td>${item.Subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
