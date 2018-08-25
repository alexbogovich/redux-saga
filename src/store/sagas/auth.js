import {put} from "redux-saga/effects"
import {logoutSucceed} from "../actions"


export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(logoutSucceed());
}
