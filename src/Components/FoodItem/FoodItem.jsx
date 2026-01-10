import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, selected = false, onSelect }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className={`food-item ${selected ? 'selected' : ''}`} onClick={() => onSelect && onSelect()}>
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-img" />
      </div>

      <div className="food-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {console.log(id)}
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>

        {!cartItems[id] ? (
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(id)}
          >
            Add to Cart
          </button>
         
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              className="remove"
              onClick={() => removeFromCart(id)}
            />
            <p className="itemCount">{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              className="addd"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
