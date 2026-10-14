import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  Plus,
  Minus,
  Trash2,
  X,
  Menu,
  ArrowRight,
  CheckCircle,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    badge: "BESTSELLER",
    color: "#f1e8df",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 1899,
    oldPrice: 2599,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    badge: "POPULAR",
    color: "#f4e7e7",
  },
  {
    id: 3,
    name: "Minimal Watch",
    category: "Accessories",
    price: 3299,
    oldPrice: 4499,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    badge: "NEW",
    color: "#e8e9e5",
  },
  {
    id: 4,
    name: "Everyday Backpack",
    category: "Accessories",
    price: 1499,
    oldPrice: 1999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
    badge: "",
    color: "#e6eaf0",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Fashion",
    price: 2799,
    oldPrice: 3999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    badge: "SALE",
    color: "#f2e6df",
  },
  {
    id: 6,
    name: "Premium Sunglasses",
    category: "Accessories",
    price: 1199,
    oldPrice: 1699,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    badge: "",
    color: "#e9e5dc",
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    oldPrice: 5499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700",
    badge: "TRENDING",
    color: "#e5e7eb",
  },
  {
    id: 8,
    name: "Travel Bottle",
    category: "Lifestyle",
    price: 599,
    oldPrice: 899,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700",
    badge: "",
    color: "#e2ebe5",
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Lifestyle",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    showNotice(`${product.name} added to your cart`);
  }

  function updateQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    setOrderPlaced(true);
    setCart([]);
  }

  function closeCheckout() {
    setCheckoutOpen(false);
    setOrderPlaced(false);
  }

  return (
    <div className="app">
      <div className="announcement">
        Free shipping on orders above ₹2,000
        <span> · </span>
        Discover your everyday essentials
      </div>

      <header className="header">
        <a className="logo" href="#home">
          nova<span>.</span>
        </a>

        <button
          className="icon-button mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          <Menu size={23} />
        </button>

        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>
            Home
          </a>
          <a href="#products" onClick={() => setMobileMenu(false)}>
            Shop
          </a>
          <a href="#features" onClick={() => setMobileMenu(false)}>
            Why Nova
          </a>
          <a href="#footer" onClick={() => setMobileMenu(false)}>
            Contact
          </a>
        </nav>

        <div className="header-actions">
          <label className="header-search">
            <Search size={18} />
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </label>

          <button
            className="icon-button cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={21} />
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              THE EVERYDAY COLLECTION
            </span>

            <h1>
              Good things.
              <br />
              <span>Better living.</span>
            </h1>

            <p>
              Thoughtfully selected essentials for your lifestyle.
              Discover products that bring a little more joy to every day.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#products">
                Explore collection <ArrowRight size={18} />
              </a>
              <span className="hero-note">Curated for your everyday.</span>
            </div>

            <div className="hero-stats">
              <div>
                <strong>8+</strong>
                <span>Featured products</span>
              </div>
              <div>
                <strong>4.7/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>Easy</strong>
                <span>Shopping experience</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
                alt="Stylish modern retail store"
              />
            </div>

            <div className="floating-card">
              <div className="floating-icon">
                <Star size={19} fill="currentColor" />
              </div>
              <div>
                <strong>Made for you</strong>
                <p>Everyday favorites</p>
              </div>
            </div>

            <div className="hero-circle">NOVA<br />SELECT</div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="feature">
            <Truck size={23} />
            <div>
              <strong>Easy shipping</strong>
              <span>Free above ₹2,000</span>
            </div>
          </div>
          <div className="feature">
            <ShieldCheck size={23} />
            <div>
              <strong>Shopping made simple</strong>
              <span>Clear pricing</span>
            </div>
          </div>
          <div className="feature">
            <Package size={23} />
            <div>
              <strong>Curated collection</strong>
              <span>Everyday essentials</span>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-label">THE NOVA EDIT</span>
              <h2>Find your favorites<span>.</span></h2>
              <p>Useful things. Thoughtful choices. Better everyday living.</p>
            </div>

            <label className="sort-control">
              <span>Sort by</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category-chip active" : "category-chip"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="results-info">
            <span>{filteredProducts.length} products to explore</span>
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>
                Clear search <X size={14} />
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div
                    className="product-image"
                    style={{ backgroundColor: product.color }}
                  >
                    <img src={product.image} alt={product.name} loading="lazy" />

                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}

                    <button
                      className={
                        wishlist.includes(product.id)
                          ? "wishlist-button wishlisted"
                          : "wishlist-button"
                      }
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`${
                        wishlist.includes(product.id) ? "Remove" : "Add"
                      } ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`}
                    >
                      <Heart
                        size={18}
                        fill={
                          wishlist.includes(product.id) ? "currentColor" : "none"
                        }
                      />
                    </button>

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      <Plus size={17} /> Add to cart
                    </button>
                  </div>

                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>

                    <div className="product-bottom">
                      <div className="price-group">
                        <strong>{formatPrice(product.price)}</strong>
                        <del>{formatPrice(product.oldPrice)}</del>
                      </div>

                      <span className="rating">
                        <Star size={14} fill="currentColor" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-search">
              <Search size={36} />
              <h3>No products found</h3>
              <p>Try a different search or choose another category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                View all products
              </button>
            </div>
          )}
        </section>

        <section className="newsletter">
          <div>
            <span className="section-label">A LITTLE SOMETHING EXTRA</span>
            <h2>Good finds, straight to you.</h2>
            <p>
              Sign-up UI preview: connect this form to your backend to collect
              newsletter subscriptions.
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              showNotice("Newsletter demo submitted!");
              event.currentTarget.reset();
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />
            <button type="submit" aria-label="Subscribe">
              Join us <ArrowRight size={17} />
            </button>
          </form>
        </section>
      </main>

      <footer id="footer">
        <a className="logo footer-logo" href="#home">
          nova<span>.</span>
        </a>
        <p>Thoughtful essentials for your everyday.</p>
        <span>© {new Date().getFullYear()} Nova Store. Demo project.</span>
      </footer>

      {notice && <div className="toast">{notice}</div>}

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCartOpen(false);
        }}>
          <aside className="cart-drawer">
            <div className="drawer-header">
              <div>
                <span className="section-label">YOUR SELECTION</span>
                <h2>Your cart ({cartCount})</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={23} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingCart size={30} />
                </div>
                <h3>Your cart is taking a break.</h3>
                <p>Add something you love and it'll appear here.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <strong>{formatPrice(item.price)}</strong>

                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          setCart((current) =>
                            current.filter((product) => product.id !== item.id)
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <strong>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </strong>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <p className="shipping-note">
                    {subtotal >= 2000
                      ? "You've unlocked free shipping!"
                      : `Add ${formatPrice(
                          2000 - subtotal
                        )} more for free shipping.`}
                  </p>

                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    Continue to checkout <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeCheckout();
        }}>
          <div className="checkout-modal">
            <button
              className="icon-button modal-close"
              onClick={closeCheckout}
              aria-label="Close checkout"
            >
              <X size={22} />
            </button>

            {orderPlaced ? (
              <div className="order-success">
                <div className="success-icon">
                  <CheckCircle size={36} />
                </div>
                <span className="section-label">DEMO ORDER</span>
                <h2>Thanks for your order!</h2>
                <p>
                  Your demo checkout was completed successfully. No payment
                  was collected and no actual order was submitted to a server.
                </p>
                <button className="primary-button" onClick={closeCheckout}>
                  Continue shopping <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <span className="section-label">ALMOST YOURS</span>
                <h2>Checkout</h2>
                <p className="checkout-intro">
                  Enter your details to try the demo checkout.
                </p>

                <form className="checkout-form" onSubmit={placeOrder}>
                  <label>
                    Full name
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label>
                    Delivery address
                    <textarea
                      placeholder="House number, street, city, PIN code"
                      rows="3"
                      required
                    />
                  </label>

                  <div className="checkout-total">
                    <span>Order total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <button className="primary-button checkout-button" type="submit">
                    Place demo order <ArrowRight size={18} />
                  </button>

                  <p className="demo-disclaimer">
                    Demo only — payment processing is not connected.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;