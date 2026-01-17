import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_CONFIG = {
  expires: 7, // 7 days
  secure: true, // HTTPS only
  sameSite: 'strict' // CSRF protection
};

// User data cookies
export const setUserCookie = (userData) => {
  Cookies.set('user', JSON.stringify(userData), COOKIE_CONFIG);
};

export const getUserCookie = () => {
  const userCookie = Cookies.get('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

export const removeUserCookie = () => {
  Cookies.remove('user');
};

// Token cookie
export const setTokenCookie = (token) => {
  Cookies.set('token', token, COOKIE_CONFIG);
};

export const getTokenCookie = () => {
  return Cookies.get('token');
};

export const removeTokenCookie = () => {
  Cookies.remove('token');
};

// Cart data cookies
export const setCartCookie = (cartData) => {
  Cookies.set('cartItems', JSON.stringify(cartData), COOKIE_CONFIG);
};

export const getCartCookie = () => {
  const cartCookie = Cookies.get('cartItems');
  return cartCookie ? JSON.parse(cartCookie) : {};
};

export const removeCartCookie = () => {
  Cookies.remove('cartItems');
};

// Clear all user-related cookies
export const clearAllUserCookies = () => {
  removeUserCookie();
  removeTokenCookie();
  removeCartCookie();
};
