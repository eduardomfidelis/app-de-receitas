import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeInProgress from './components/RecipeInProgress';
import Layout from './components/Layout';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Route>
      <Route path="/meals/:mealid" element={ <RecipeDetails /> } />
      <Route path="/drinks/:drinkid" element={ <RecipeDetails /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="/meals/:recipeId/in-progress" element={ <RecipeInProgress /> } />
      <Route
        path="/drinks/:recipeId/in-progress"
        element={ <RecipeInProgress /> }
      />
    </Routes>
  );
}

export default App;
