import React from 'react';
import './FoodContainer.css';

function FoodContainer({ food }) {
  // Bestimme die Klasse für die Zubereitungszeit
  const prepSpeedClass = `prep-badge ${food.prepSpeed === 'schnell' ? 'quick' : 'long'}`;
  
  return (
    <div className="food-card animate-in">
      <div className="card-header">
        <h3 className="food-title">{food.name}</h3>
        <span className={prepSpeedClass}>
          {food.prepSpeed === 'schnell' ? '⚡ Schnell' : '⏰ Aufwendig'}
        </span>
      </div>

      <div className="ingredients-section">
        <h4 className="ingredients-title">Zutaten:</h4>
        <div className="ingredients-grid">
          {food.ingredients.map((ingredient, index) => (
            <div
              key={`${food.name}-${ingredient}-${index}`}
              className="ingredient-tag"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {ingredient}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodContainer;





