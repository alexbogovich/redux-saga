import axios from "../../axios-orders"
import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
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

export const initIngredients = () => dispatch => {
  axios.get("https://react-my-burger-95879.firebaseio.com/ingredients.json")
    .then(r => dispatch(setIngredients(r.data)))
    .catch(e => dispatch(fetchIngredientsFailed()))
}
