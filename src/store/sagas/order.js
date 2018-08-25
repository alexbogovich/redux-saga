import axios from "../../axios-orders"
import {
  fetchOrdersFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  purchaseBurgerError,
  purchaseBurgerStart,
  purchaseBurgerSuccess,
} from "../actions/order"
import {put} from "redux-saga/effects"

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart())
  try {
    const {orderData, token} = action
    const response = yield axios.post("/orders.json?auth=" + token, orderData)
    yield put(purchaseBurgerSuccess(response.data.name, orderData))
  } catch (e) {
    yield put(purchaseBurgerError(e))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart())
  try {
    const {token} = action
    const response = yield axios.get("orders.json?auth=" + token)
    const fetchOrders = Object.entries(response.data).map(([k, v]) => ({...v, id: k}))
    yield put(fetchOrdersSuccess(fetchOrders))
  } catch (e) {
    yield put(fetchOrdersFail(e))
  }
}
