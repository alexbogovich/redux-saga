import axios from "../../axios-orders"
import {
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "./actionTypes"

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
})

export const purchaseBurgerError = error => ({
  type: PURCHASE_BURGER_FAIL,
  error: error,
})

export const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,
})

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart())
  axios.post("/orders.json?auth=" + token, orderData)
    .then(r => {
      console.log(r.data)
      dispatch(purchaseBurgerSuccess(r.data.name, orderData))
    })
    .catch(e => {
      dispatch(purchaseBurgerError(e))
    })
}

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
})

const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  orders: orders,
})

const fetchOrdersFail = err => ({
  type: FETCH_ORDERS_FAIL,
  error: err,
})

const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
})

export const fetchOrders = token => dispatch => {
  dispatch(fetchOrdersStart())

  axios.get("orders.json?auth=" + token)
    .then(r => {
      console.log(r.data)
      const fetchOrders = Object.keys(r.data)
        .map(key => ({...r.data[key], id: key}))
      dispatch(fetchOrdersSuccess(fetchOrders))
    })
    .catch(e => {
      dispatch(fetchOrdersFail(e))
    })
}
