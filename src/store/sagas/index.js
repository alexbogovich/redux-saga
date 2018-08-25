import {takeEvery} from "redux-saga/effects"
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga} from "./auth"
import {AUTH_CHECK_TIMEOUT, AUTH_INITIATE_LOGOUT, AUTH_USER} from "../actions/actionTypes"

export function* watchAuth() {
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(AUTH_USER, authUserSaga)
}
