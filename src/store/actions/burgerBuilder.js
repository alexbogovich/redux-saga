import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  FETCH_INGREDIENTS_INIT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from "./actionTypes"

export const addIngredient = ingredientName => ({
  type: ADD_INGREDIENT,
  ingredientName: ingredientName,
})

export const removeIngredient = ingredientName => ({
  type: REMOVE_INGREDIENT,
  ingredientName: ingredientName,
})

export const setIngredients = ingredients => ({
  type: SET_INGREDIENTS,
  ingredients: ingredients,
})

export const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
})

export const initIngredients = () => ({
  type: FETCH_INGREDIENTS_INIT
})
