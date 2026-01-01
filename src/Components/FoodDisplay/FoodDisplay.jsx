import React from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = ({ category = "All" }) => {
  const { food_list } = React.useContext(StoreContext);

  // Filter food items based on category
  const filteredFoodList = food_list.filter(item => 
    category === "All" || item.category === category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
            No dishes available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
