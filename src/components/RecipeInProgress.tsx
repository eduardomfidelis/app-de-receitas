import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MealTypes, DrinkTypes } from '../types';
import IngredientList from './IngredientList';
import FavoriteShare from './FavoriteShare';
import './RecipeInProgress.css';

function RecipesInProgress() {
  const { recipeId } = useParams();
  const location = useLocation();

  const [mealsInfo, setMealsInfo] = useState<MealTypes | null>(null);
  const [drinkInfo, setDrinkInfo] = useState<DrinkTypes | null>(null);
  const [inProgressRecipes, setInprogressRecipes] = useState<Record<string
  , boolean[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname.includes('/meals/')) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setMealsInfo(data.meals ? data.meals[0] : null);
        setDrinkInfo(null);
      } else if (location.pathname.includes('/drinks/')) {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setDrinkInfo(data.drinks ? data.drinks[0] : null);
        setMealsInfo(null);
      }
      const inProgressRecipesData = JSON.parse(localStorage
        .getItem('inProgressRecipes') || '{}');
      setInprogressRecipes(inProgressRecipesData);
    };

    fetchData();
  }, [recipeId, location]);

  return (
    <div className="container">
      {mealsInfo && (
        <div
          key={ mealsInfo.idMeal }
        >
          <img
            src={ mealsInfo.strMealThumb }
            alt={ mealsInfo.strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <h1 className="recipe-title" data-testid="recipe-title">{mealsInfo.strMeal}</h1>
          <h2
            className="recipe-category"
            data-testid="recipe-category"
          >
            {mealsInfo.strCategory}
          </h2>
          <IngredientList
            recipe={ mealsInfo }
            inProgressRecipes={ inProgressRecipes }
            recipeId={ recipeId }
          />
          <p
            className="recipe-instructions"
            data-testid="instructions"
          >
            { mealsInfo.strInstructions }
          </p>
        </div>
      )}
      {drinkInfo && (
        <div
          key={ drinkInfo.idDrink }
        >
          <img
            src={ drinkInfo.strDrinkThumb }
            alt={ drinkInfo.strDrink }
            data-testid="recipe-photo"
            className="Styles.recipe-photo"
          />
          <p
            className="recipe-instructions"
            data-testid="instructions"
          >
            { drinkInfo.strInstructions }
          </p>
          <h1 data-testid="recipe-title">{drinkInfo.strDrink}</h1>
          <h2 data-testid="recipe-category">{drinkInfo.strCategory}</h2>
          <IngredientList
            recipe={ drinkInfo }
            inProgressRecipes={ inProgressRecipes }
            recipeId={ recipeId }
          />
        </div>
      )}
      <FavoriteShare />
      <button className="recipe-finish" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
export default RecipesInProgress;
