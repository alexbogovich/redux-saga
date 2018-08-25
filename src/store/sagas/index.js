import {all, takeEvery, takeLatest} from "redux-saga/effects"
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from "./auth"
import {
  AUTH_CHECK_INITIAL_STATE,
  AUTH_CHECK_TIMEOUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_USER,
  FETCH_INGREDIENTS_INIT, FETCH_ORDERS, PURCHASE_BURGER_FETCH,
} from "../actions/actionTypes"
import {initIngredientsSaga} from "./burgerBuilder"
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order"

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(FETCH_INGREDIENTS_INIT, initIngredientsSaga)
}

export function* watchOrder() {
  yield takeLatest(PURCHASE_BURGER_FETCH, purchaseBurgerSaga)
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga)
}
