// Setting up the Context API
import { createContext, useEffect } from "react";
import { useState } from "react"; 

import { food_list } from "../assets/frontend_assets/assets";   

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Initialize cartItems from localStorage or empty object
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return {};
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // User authentication state - only load if token exists
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      // Only restore user if token exists (user is actually logged in)
      if (token && savedUser) {
        return JSON.parse(savedUser);
      }
      // Clear stale data if token doesn't exist
      if (savedUser && !token) {
        localStorage.removeItem('user');
      }
      return null;
    } catch (error) {
      return null;
    }
  });

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Also clear token when user is null
    }
  }, [user]);

  const loginUser = (userData) => {
    setUser(userData);
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('user'); // Clear user data
    clearCart();
  };

  // Promo codes database
  const promoCodes = {
    "UG20": 20, // 20% off
    "UG10": 10, // 10% off
    "WELCOME": 15 // 15% off
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedQuantity = prev[itemId] - 1;

      if (updatedQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest; // removes item from cart
      }

      return {
        ...prev,
        [itemId]: updatedQuantity
      };
    });
  };

  const validatePromoCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    if (promoCodes[upperCode]) {
      setPromoCode(upperCode);
      setDiscountApplied(true);
      return { valid: true, discount: promoCodes[upperCode] };
    }
    setDiscountApplied(false);
    return { valid: false, discount: 0 };
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountApplied(false);
  };

  const clearCart = () => {
    setCartItems({});
    removePromoCode();
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        totalAmount += item.price * cartItems[item._id];
      }
    });
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    promoCode,
    discountApplied,
    validatePromoCode,
    removePromoCode,
    clearCart,
    getTotalCartAmount,
    promoCodes,
    user,
    loginUser,
    logoutUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
