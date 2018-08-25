import {call, put} from "redux-saga/effects"
import {delay} from "redux-saga"
import {logout, logoutSucceed, authFail, authStart, authSuccess, checkAuthTimeout} from "../actions"
import axios from "axios"

const fireBaseSignUp = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"
const fireBaseSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token")
  yield call([localStorage, "removeItem"], "expirationDate")
  yield call([localStorage, "removeItem"], "userId")
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
    const response = yield call([axios, "post"], url, authData)
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    yield call([localStorage, "setItem"], "token", response.data.idToken)
    yield call([localStorage, "setItem"], "expirationDate", expirationDate)
    yield call([localStorage, "setItem"], "userId", response.data.localId)
    yield put(authSuccess(response.data.idToken, response.data.localId))
    yield put(checkAuthTimeout(response.data.expiresIn))
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield call([localStorage, "getItem"], "token")
  if (!token) {
    yield put(logout());
  } else {
    const storageDate = yield call([localStorage, "getItem"], "expirationDate")
    const expirationDate = new Date(storageDate)
    if (expirationDate <= new Date()) {
      yield put(logout());
    } else {
      const userId = yield call([localStorage, "getItem"], "userId")
      yield put(authSuccess(token, userId))
      yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}
