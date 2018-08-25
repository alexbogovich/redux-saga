import {put} from "redux-saga/effects"
import {delay} from "redux-saga"
import {logout, logoutSucceed, authFail, authStart, authSuccess, checkAuthTimeout} from "../actions"
import axios from "axios"

const fireBaseSignUp = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"
const fireBaseSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"

export function* logoutSaga(action) {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("userId")
  yield put(logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime)
  yield put(logout())
}

export function* authUserSaga(action) {
  yield put(authStart())
  const {email, password, isSignup} = action
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  let url = fireBaseSignUp
  if (!isSignup) {
    url = fireBaseSignIn
  }
  try {
    const response = yield axios.post(url, authData)
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    localStorage.setItem("token", response.data.idToken)
    localStorage.setItem("expirationDate", expirationDate)
    localStorage.setItem("userId", response.data.localId)
    yield put(authSuccess(response.data.idToken, response.data.localId))
    yield put(checkAuthTimeout(response.data.expiresIn))
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}
