import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import './Home.css';

const Home = () => {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="Home superb-home" style={{ background: 'linear-gradient(120deg, #fff7f0 0%, #fff 100%)', minHeight: '100vh', paddingBottom: 0 }}>
      <section className="hero-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '64px 0 48px 0', maxWidth: 1200, margin: '0 auto', gap: 48 }}>
        <div className="hero-content" style={{ flex: 1, paddingLeft: 32 }}>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: '#222', marginBottom: 18, lineHeight: 1.1, letterSpacing: -2 }}>Delicious Food, Delivered <span style={{ color: '#ff8a00' }}>Superb</span></h1>
          <p style={{ fontSize: 22, color: '#555', marginBottom: 36, maxWidth: 520, lineHeight: 1.5 }}>Order from the best restaurants in your city. Fresh, hot, and at your doorstep in minutes. Experience food delivery like never before.</p>
          {!user && (
            <div className="hero-buttons" style={{ display: 'flex', gap: 24 }}>
              <button className="hero-login-btn" style={{ padding: '16px 48px', borderRadius: 32, background: '#ff8a00', color: '#fff', fontWeight: 700, fontSize: 20, border: 'none', boxShadow: '0 4px 16px rgba(255,138,0,0.10)', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigate('/signin')}>Login</button>
              <button className="hero-signup-btn" style={{ padding: '16px 48px', borderRadius: 32, background: '#fff', color: '#ff8a00', fontWeight: 700, fontSize: 20, border: '2px solid #ff8a00', boxShadow: '0 4px 16px rgba(255,138,0,0.10)', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigate('/signin')}>Sign Up</button>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={assets.hero_image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'} alt="Delicious food" className="hero-image" style={{ width: 420, height: 420, objectFit: 'cover', borderRadius: 32, boxShadow: '0 8px 32px rgba(255,138,0,0.10)' }} />
        </div>
      </section>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 0 32px 0' }}>
        <ExploreMenu />
        <FoodDisplay />
      </section>
    </div>
  );
};

export default Home;
