'use client'

import { useState } from 'react'

const products = [
  { id: 1, name: 'Classic White T-Shirt', category: 'Men', price: 29.99, icon: '👕' },
  { id: 2, name: 'Denim Jacket', category: 'Women', price: 89.99, icon: '🧥' },
  { id: 3, name: 'Summer Dress', category: 'Women', price: 69.99, icon: '👗' },
  { id: 4, name: 'Slim Fit Jeans', category: 'Men', price: 59.99, icon: '👖' },
  { id: 5, name: 'Leather Boots', category: 'Accessories', price: 129.99, icon: '👢' },
  { id: 6, name: 'Casual Sneakers', category: 'Accessories', price: 79.99, icon: '👟' },
  { id: 7, name: 'Wool Sweater', category: 'Men', price: 49.99, icon: '🧶' },
  { id: 8, name: 'Silk Blouse', category: 'Women', price: 54.99, icon: '👚' },
  { id: 9, name: 'Sports Watch', category: 'Accessories', price: 199.99, icon: '⌚' },
  { id: 10, name: 'Leather Handbag', category: 'Accessories', price: 149.99, icon: '👜' },
  { id: 11, name: 'Cotton Polo', category: 'Men', price: 39.99, icon: '👔' },
  { id: 12, name: 'Maxi Skirt', category: 'Women', price: 44.99, icon: '🩱' },
]

export default function Home() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <a href="#" className="logo">FASHION</a>
            <ul className="nav-links">
              <li><a href="#products">Shop</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Elevate Your Style</h1>
          <p>Discover the latest trends in fashion with our premium collection</p>
          <a href="#products" className="btn">Shop Now</a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="container">
          <h2 className="section-title">Our Collection</h2>

          <div className="filters">
            {['All', 'Men', 'Women', 'Accessories'].map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.icon}</div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">${product.price}</div>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.icon}</div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Shop</h3>
              <ul>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Sale</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Help</h3>
              <ul>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>About</h3>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Fashion Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
