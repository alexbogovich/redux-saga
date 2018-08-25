import * as actionTypes from "./actionTypes"
import {AUTH_CHECK_TIMEOUT, AUTH_USER} from "./actionTypes"

const fireBaseSignUp = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"
const fireBaseSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT,
})

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
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

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (!token) {
      // dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (expirationDate <= new Date()) {
        // dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId")
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
