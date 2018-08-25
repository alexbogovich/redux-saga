import * as actionTypes from "./actionTypes"
import {
  AUTH_CHECK_INITIAL_STATE,
  AUTH_CHECK_TIMEOUT,
  AUTH_FAIL,
  AUTH_INITIATE_LOGOUT,
  AUTH_LOGOUT,
  AUTH_USER,
  SET_AUTH_REDIRECT_PATH,
} from "./actionTypes"

export const authStart = () => ({
  type: actionTypes.AUTH_START,
})

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
})

export const authFail = (error) => ({
  type: AUTH_FAIL,
  error: error,
})

export const logout = () => ({
  type: AUTH_INITIATE_LOGOUT,
})

export const logoutSucceed = () => ({
  type: AUTH_LOGOUT,
})

export const checkAuthTimeout = (expirationTime) => ({
  type: AUTH_CHECK_TIMEOUT,
  expirationTime: expirationTime * 1000,
})

export const auth = (email, password, isSignup) => ({
  type: AUTH_USER,
  email: email,
  password: password,
  isSignup: isSignup,
})

export const setAuthRedirectPath = (path) => ({
  type: SET_AUTH_REDIRECT_PATH,
  path: path,
})

export const authCheckState = () => ({
  type: AUTH_CHECK_INITIAL_STATE,
})
