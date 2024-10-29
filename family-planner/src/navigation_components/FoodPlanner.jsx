import React, { useState, useEffect } from 'react';
import FoodContainer from '../simple_components/FoodContainer';
import './FoodPlanner.css';

const FoodPlanner = () => {
  const [foods, setFoods] = useState([
    { id: 1, name: 'Pizza', ingredients: ['passierte Tomaten', 'Reibekäse', 'Salami', 'Mais', 'Teig', 'Mozzarella'], prepSpeed: 'schnell' },
    { id: 2, name: 'Flammkuchen', ingredients: ['Creme Fraiche', 'Teig', 'Reibekäse', 'Speck', 'Mais'], prepSpeed: 'schnell' },
    { id: 3, name: 'Rouladen u. Semmelknödel', ingredients: ['Rouladen Fleisch', 'Bacon', 'Sauergurke', 'Semmelbroesel', 'Soße', 'Rotkohl'], prepSpeed: 'lange' },
    { id: 4, name: 'Wraps', ingredients: ['Fleisch', 'Gemüse', 'Wraps', 'Soßen'], prepSpeed: 'schnell' },
    { id: 5, name: 'Burger', ingredients: ['Brötchen', 'Hackfleisch', 'Gemüse', 'Käse', 'Burger Soße'], prepSpeed: 'schnell' },
    { id: 6, name: 'Linsen u. Spätzle', ingredients: ['Spätzle', 'Linsen', 'Karrote', 'Kartoffel', 'Würstchen', 'Speck'], prepSpeed: 'lange' },
    { id: 7, name: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Hackfleisch', 'passierte Tomaten', 'Tomatenmark', 'Zwiebel', 'Harissa'], prepSpeed: 'schnell' },
    { id: 8, name: 'Spaghetti Carbonara', ingredients: ['Spaghetti', 'Speck', 'Eier', 'Parmesan'], prepSpeed: 'schnell' },
  ]);

  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  const getRandomFoods = () => {
    let randomFoods = [];
    let usedIndices = new Set();
    
    for (let i = 0; i < 7; i++) {
      if (usedIndices.size === foods.length) {
        setDuplicateWarning(true);
        usedIndices.clear();
      }

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * foods.length);
      } while (usedIndices.has(randomIndex));

      usedIndices.add(randomIndex);
      randomFoods.push({ ...foods[randomIndex], weekDay: weekDays[i] });
    }
    
    setWeeklyMenu(randomFoods);
  };

  useEffect(() => {
    getRandomFoods();
  }, []);

  const regenerateDay = (dayIndex) => {
    const currentMenu = [...weeklyMenu];
    const usedFoods = new Set(currentMenu.map(item => item.id));
    let newFood;
    
    do {
      const randomIndex = Math.floor(Math.random() * foods.length);
      newFood = foods[randomIndex];
    } while (usedFoods.has(newFood.id) && usedFoods.size < foods.length);

    currentMenu[dayIndex] = { ...newFood, weekDay: weekDays[dayIndex] };
    setWeeklyMenu(currentMenu);
  };

  return (
    <div className="main-container">
      <div className="container-header">
        <div className="description-container">
          <h1 className="title">Food Planner</h1>
          <h2 className="subtitle">Essensvorschläge für die Woche</h2>
        </div>
        <div className="button-container">
          <button className="generate-week-btn" onClick={getRandomFoods}>
            Neue Woche generieren
          </button>
          <button className="return-btn" onClick={() => window.history.back()}>
            Zurück
          </button>
        </div>
      </div>
      <div className="week-container">
        <div className="weekly-grid">
        {weeklyMenu.map((food, index) => (
            <div key={`${food.id}-${index}`} className={'day-container ' + 'day-container-'+index}>
              <div className="weekday-label-and-button">
                <h3 className="weekday-label">{food.weekDay}</h3>
                <button className="regenerate-btn" onClick={() => regenerateDay(index)}>
                  ↻
                </button>
              </div>
              <FoodContainer food={food} />
            </div>
          ))}
        </div>
      </div>
  </div>
  );
};

export default FoodPlanner;