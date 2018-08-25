import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAIL, PURCHASE_BURGER_FETCH,
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

export const purchaseBurger = (orderData, token) => ({
  type: PURCHASE_BURGER_FETCH,
  orderData: orderData,
  token: token
})

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
})

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  orders: orders,
})

export const fetchOrdersFail = err => ({
  type: FETCH_ORDERS_FAIL,
  error: err,
})

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
})

export const fetchOrders = token => ({
  type: FETCH_ORDERS,
  token: token
})
