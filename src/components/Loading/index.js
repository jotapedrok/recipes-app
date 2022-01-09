import React, { useEffect } from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import asianFood from '../../images/loadingIcons/asian-food.png';
import chickenLeg from '../../images/loadingIcons/chicken-leg.png';
import cocktail from '../../images/loadingIcons/cocktail.png';
import drink from '../../images/loadingIcons/drink.png';
import meal from '../../images/loadingIcons/meal.png';
import pizza from '../../images/loadingIcons/pizza.png';
import salad from '../../images/loadingIcons/salad.png';
import spaguetti from '../../images/loadingIcons/spaguetti.png';
import fastFood from '../../images/loadingIcons/fast-food.png';
import sparklingWater from '../../images/loadingIcons/sparkling-water.png';
import './style.css';

export default function Loading() {
  const changeImage = () => {
    const TIME = 2000;
    const icons = document.getElementsByClassName('icon');
    const max = icons.length;
    let index = 0;
    setInterval(() => {
      icons[index].classList.remove('active');
      index += 1;
      if (index >= max) {
        index = 0;
      }
      icons[index].classList.add('active');
    }, TIME);
  };

  useEffect(() => {
    changeImage();
  }, []);

  return (
    <div className="loading-content">
      <div className="icons-container">
        <img className="icon active" src={ drinkIcon } alt="Drink icon" />
        <img className="icon" src={ chickenLeg } alt="Chicken Leg Icon" />
        <img className="icon" src={ cocktail } alt="Cocktail Icon" />
        <img className="icon" src={ meal } alt="Meal Icon" />
        <img className="icon" src={ asianFood } alt="Asian Food Icon" />
        <img className="icon" src={ pizza } alt="Pizza Icon" />
        <img className="icon" src={ salad } alt="Salad Icon" />
        <img className="icon" src={ spaguetti } alt="Spaguetti Icon" />
        <img className="icon" src={ drink } alt="Drink Icon" />
        <img className="icon" src={ fastFood } alt="Fast Food Icon" />
        <img className="icon" src={ sparklingWater } alt="Sparkling Water Icon" />
        <img className="icon" src={ mealIcon } alt="Meal Icon" />
      </div>
    </div>
  );
}
