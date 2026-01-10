import React, { useRef, useEffect, useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const listRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const check = () => {
      setShowLeft(el.scrollLeft > 5);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const scrollByOffset = offset => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handlePointerDown = e => {
    const el = listRef.current;
    if (!el) return;
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startScroll.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  };

  const handlePointerMove = e => {
    const el = listRef.current;
    if (!el || !isDown.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const walk = startX.current - x;
    el.scrollLeft = startScroll.current + walk;
  };

  const handlePointerUp = () => {
    const el = listRef.current;
    if (!el) return;
    isDown.current = false;
    el.style.cursor = '';
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h2>Explore Our Menu</h2>
      <p className='explore-menu-text'>
        Discover a variety of delicious dishes crafted to satisfy every craving.
      </p>

      <button
        aria-label='Scroll left'
        className={`scroll-btn left ${showLeft ? 'visible' : ''}`}
        onClick={() => scrollByOffset(-Math.round((listRef.current?.clientWidth || 300) * 0.7))}
      >
        ‹
      </button>

      <div
        className='explore-menu-list'
        ref={listRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name))
              }
              className='explore-menu-list-item'
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt={item.menu_name}
                draggable={false}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <button
        aria-label='Scroll right'
        className={`scroll-btn right ${showRight ? 'visible' : ''}`}
        onClick={() => scrollByOffset(Math.round((listRef.current?.clientWidth || 300) * 0.7))}
      >
        ›
      </button>

      <hr />
    </div>
  );
};

export default ExploreMenu;
