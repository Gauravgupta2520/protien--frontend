import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { getTokenCookie } from '../../utils/cookies'
import SignIn from '../../Pages/SignIN/SignIn';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, cartItems } = useContext(StoreContext);
  const [menu, setMenu] = useState('home');
  const [showSignIn, setShowSignIn] = useState(false); // 'login' | 'signup' | false
  const [dropdown, setDropdown] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const avatarUrl =
    assets.profile_icon || 'https://cdn.jsdelivr.net/gh/identicons/jasonlong/github-octocat@2x.png';

  // Validate user state on mount - ensure token exists
  useEffect(() => {
    const token = getTokenCookie();
    // If no token but user exists in context, clear user (stale data)
    if (!token && user) {
      logoutUser();
    }
  }, []);

  // Check if user is actually logged in (has token)
  const isLoggedIn = user && getTokenCookie();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest('.user-avatar-container')) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdown]);

  // Logout function - properly handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear everything first
    logoutUser(); // This will clear all cookies
    
    // Close dropdown and mobile menu
    setDropdown(false);
    setMobileMenuOpen(false);
    
    // Navigate to home
    navigate('/');
    
    // Small delay then reload to ensure clean state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Handle menu item click on mobile
  const handleMobileMenuItemClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="Navbar superb-navbar"
      style={{
        boxShadow: '0 2px 16px rgba(255,138,0,0.08)',
        background: '#fff',
        padding: 0,
        borderRadius: 0,
        marginBottom: 0,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 80 }}
      >
        {/* Left Section */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <img
            src={assets.logo}
            alt="Rocket Meal Logo"
            className="logo"
            style={{
              marginRight: 16,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onError={(e) => {
              console.error('Logo failed to load:', assets.logo);
              e.currentTarget.style.display = 'none';
            }}
          />
          <ul
            className="navbar-menu"
            style={{ gap: 32, fontWeight: 500, fontSize: 18, margin: 0 }}
          >
            <li>
              <Link
                to="/"
                className={menu === 'home' ? 'active' : ''}
                onClick={() => setMenu('home')}
                style={{ color: menu === 'home' ? '#ff8a00' : '#222', textDecoration: 'none' }}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#explore-menu"
                className={menu === 'Menu' ? 'active' : ''}
                onClick={() => setMenu('Menu')}
                style={{ color: menu === 'Menu' ? '#ff8a00' : '#222', textDecoration: 'none' }}
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className={menu === 'contact us' ? 'active' : ''}
                onClick={() => setMenu('contact us')}
                style={{ color: menu === 'contact us' ? '#ff8a00' : '#222', textDecoration: 'none' }}
              >
                Contact Us
              </a>
            </li>
          </ul>
          
          {/* Hamburger Menu Button */}
          <button 
            className="navbar-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <ul className={`navbar-menu-mobile ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              className={menu === 'home' ? 'active' : ''}
              onClick={() => handleMobileMenuItemClick('home')}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#explore-menu"
              className={menu === 'Menu' ? 'active' : ''}
              onClick={() => handleMobileMenuItemClick('Menu')}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#footer"
              className={menu === 'contact us' ? 'active' : ''}
              onClick={() => handleMobileMenuItemClick('contact us')}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Explore Icon */}
          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon"
            style={{ width: 28, height: 28, opacity: 0.7, cursor: 'pointer' }}
            onClick={() => setShowExplore(true)}
          />
          {showExplore && (
            <div
              className="explore-modal-overlay"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.10)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setShowExplore(false)}
            >
              <div
                className="explore-modal"
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  padding: 40,
                  minWidth: 340,
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="explore-modal-close"
                  aria-label="Close explore"
                  onClick={() => setShowExplore(false)}
                  style={{ fontSize: 22, background: 'none', border: 'none', position: 'absolute', top: 12, right: 18, cursor: 'pointer' }}
                >
                  ✕
                </button>
                <h2 style={{ fontSize: 28, color: '#ff8a00', fontWeight: 800, marginBottom: 18 }}>Explore our menu</h2>
                <p style={{ fontSize: 18, color: '#444', textAlign: 'center', marginBottom: 0 }}>
                  Discover delicious options and find your next meal!
                </p>
              </div>
            </div>
          )}

          {/* Basket */}
          <div className="basket-icon-container" onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={assets.basket_icon} alt="basket" className="basket-icon" style={{ width: 32, height: 32 }} />
            {Object.keys(cartItems).length > 0 && (
              <div className="dot" style={{ 
                position: 'absolute', 
                top: 'calc(4px - 0.1cm)', 
                right: 4, 
                width: 8, 
                height: 8, 
                background: '#ff4444', 
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 10
              }}></div>
            )}
          </div>

          {/* Login / Sign Up Buttons - Show when NOT logged in */}
          {!isLoggedIn && (
            <>
              <button
                className="signin-btn"
                style={{ padding: '10px 32px', borderRadius: 24, background: '#ff8a00', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', marginRight: 8, cursor: 'pointer' }}
                onClick={() => setShowSignIn('login')}
              >
                Login
              </button>
              <button
                className="signup-btn"
                style={{ padding: '10px 32px', borderRadius: 24, background: '#fff', color: '#ff8a00', fontWeight: 700, fontSize: 16, border: '2px solid #ff8a00', cursor: 'pointer' }}
                onClick={() => setShowSignIn('signup')}
              >
                Sign Up
              </button>
            </>
          )}

          {/* User Avatar Dropdown - Show when logged in */}
          {isLoggedIn && (
            <div
              className="user-avatar-container"
              style={{ position: 'relative', marginLeft: 16 }}
            >
              <img
                src={avatarUrl}
                alt="User"
                className="user-avatar"
                onClick={() => setDropdown((d) => !d)}
                style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  border: '2px solid #ff8a00', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: dropdown ? '0 4px 12px rgba(255, 138, 0, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 138, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  if (!dropdown) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              />
              {dropdown && (
                <div
                  className="user-dropdown"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 56,
                    background: '#ffffff',
                    border: '1px solid rgba(255, 138, 0, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    minWidth: '240px',
                    zIndex: 1000,
                    padding: '20px 0',
                    overflow: 'hidden',
                    animation: 'dropdownFadeIn 0.2s ease-out'
                  }}
                >
                  {/* User Info Section */}
                  <div style={{ 
                    padding: '0 20px 16px 20px', 
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      fontWeight: 700, 
                      fontSize: '16px', 
                      color: '#333',
                      marginBottom: '4px',
                      textAlign: 'left'
                    }}>
                      {user.name || 'User'}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#666',
                      textAlign: 'left',
                      wordBreak: 'break-word'
                    }}>
                      {user.email}
                    </div>
                  </div>

                  {/* Profile Option */}
                  <button 
                    className="dropdown-item" 
                    onClick={() => {
                      setDropdown(false);
                      // Navigate to profile page if you have one
                      // navigate('/profile');
                    }}
                    style={{ 
                      width: '100%', 
                      padding: '12px 20px', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontWeight: 500,
                      fontSize: '15px',
                      color: '#333',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 138, 0, 0.08)';
                      e.currentTarget.style.color = '#ff8a00';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                      e.currentTarget.style.color = '#333';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </button>

                  {/* Logout Option */}
                  <div style={{ 
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(0,0,0,0.08)'
                  }}>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ 
                        width: '100%', 
                        padding: '12px 20px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#dc3545',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
                        e.currentTarget.style.color = '#c82333';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#dc3545';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Login/Signup Modal */}
      {(showSignIn === 'login' || showSignIn === 'signup') && (
        <div className="signin-modal-overlay" style={{ background: 'rgba(0,0,0,0.12)' }} onClick={() => setShowSignIn(false)}>
          <div className="signin-modal" style={{ borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} onClick={(e) => e.stopPropagation()}>
            <button
              className="signin-modal-close"
              aria-label="Close sign in"
              onClick={() => setShowSignIn(false)}
              style={{ fontSize: 22, background: 'none', border: 'none', position: 'absolute', top: 12, right: 18, cursor: 'pointer' }}
            >
              ✕
            </button>
            <SignIn
              modeDefault={showSignIn === 'login' ? 'Login' : 'Sign Up'}
              onAuthSuccess={() => setShowSignIn(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
