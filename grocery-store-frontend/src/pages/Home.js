import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome, Morgan State Bears!</h1>
        <p>The Bear's Grocery is your one-stop shop for provisions and groceries for students at our campus. We offer great prices!</p>
        <Link to="/products" className="cta-button">Shop Now</Link>
      </header>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <Link to="/products">
              <img src="https://cdn.shopify.com/s/files/1/1755/3995/products/Cut-Whole-Oranges.png?v=1692652115" alt="Oranges" />
              <p>Fresh Oranges</p>
            </Link>
          </div>
          <div className="featured-card">
            <Link to="/products">
              <img src="https://i5.walmartimages.com/seo/Bush-s-Original-Baked-Beans-Canned-Beans-28-oz-Can_5801b66a-efcb-4a65-bad4-51b6fac96b93.fa9c41d8625fabc2e81b32ae7fb05f7a.jpeg" alt="Beans" />
              <p>Baked Beans</p>
            </Link>
          </div>
          <div className="featured-card">
            <Link to="/products">
              <img src="https://target.scene7.com/is/image/Target/GUEST_750f9316-56bc-4755-8c63-fd97267bc841?wid=800&hei=800&qlt=80&fmt=pjpeg" alt="Tomatoes" />
              <p>Fresh Tomatoes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Bear's Grocery</h2>
        <p>We pride ourselves on offering the freshest products, sourced locally and delivered with care.</p>
        <Link to="/about" className="cta-button">Learn More</Link>
      </section>
    </div>
  );
}

export default Home;


