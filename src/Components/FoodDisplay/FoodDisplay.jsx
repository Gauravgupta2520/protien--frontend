import React, { useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = ({ category = 'All' }) => {
  const { food_list } = React.useContext(StoreContext);
  const [selectedId, setSelectedId] = useState(null);

  // Filter food items based on category
  const filteredFoodList = food_list.filter(item =>
    category === 'All' || item.category === category
  );

  // When category or food list changes, clear selection (no default selection)
  useEffect(() => {
    setSelectedId(null);
  }, [category, food_list]);

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
              selected={selectedId === item._id}
              onSelect={() => setSelectedId(item._id)}
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
