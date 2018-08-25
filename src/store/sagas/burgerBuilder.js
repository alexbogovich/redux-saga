import axios from "../../axios-orders"
import {call, put} from "redux-saga/effects"
import {fetchIngredientsFailed, setIngredients} from "../actions"

const ingApi = "https://react-my-burger-95879.firebaseio.com/ingredients.json"

export function* initIngredientsSaga() {
  try {
    const response = yield call([axios, "get"],ingApi)
    yield put(setIngredients(response.data))
  } catch (e) {
    yield put(fetchIngredientsFailed())
  }
}
