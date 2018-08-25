import {authUserSaga, checkAuthTimeoutSaga, fireBaseSignIn, getDateByAdditionalTime, logoutSaga} from "./auth"
import {call, put} from "redux-saga/effects"
import {delay} from "redux-saga"
import {authStart, authSuccess, checkAuthTimeout, logout, logoutSucceed} from "../actions"
import {expectSaga} from "redux-saga-test-plan"
import axios from "axios"

describe("auth saga", () => {
  it("checkAuthTimeoutSaga with simple api", () => {
    const gen = checkAuthTimeoutSaga({expirationTime: 100})
    expect(gen.next().value).toEqual(call(delay, 100))
    expect(gen.next().value).toEqual(put(logout()))
  })

  it("checkAuthTimeoutSaga with redux-saga-test-plan", () =>
    expectSaga(checkAuthTimeoutSaga, {expirationTime: 100})
      .call(delay, 100)
      .put(logout())
      .run(),
  )

  it("logoutSaga with redux-saga-test-plan", async () => {
    await expectSaga(logoutSaga)
      .call([localStorage, "removeItem"], "token")
      .call([localStorage, "removeItem"], "expirationDate")
      .call([localStorage, "removeItem"], "userId")
      .put(logoutSucceed())
      .run()

    expect(localStorage.removeItem).toHaveBeenCalledTimes(3)
    expect(localStorage.length).toBe(0)
    expect(localStorage.removeItem).toHaveBeenCalledWith("token")
    expect(localStorage.removeItem).toHaveBeenCalledWith("expirationDate")
    expect(localStorage.removeItem).toHaveBeenCalledWith("userId")
  })

  it("authUserSaga with redux-saga-test-plan", async () => {
    const actionMock = {email: "t@t.c", password: "test", isSignup: false}
    const responseMock = {data: {idToken: "1234", expiresIn: "1000", localId: "666"}}
    const {email, password} = actionMock
    const {data: {idToken, expiresIn, localId}} = responseMock
    const dateOfExpirationMock = new Date()

    await expectSaga(authUserSaga, actionMock)
      .provide([
        [call([axios, "post"], fireBaseSignIn, {
          email: email,
          password: password,
          returnSecureToken: true,
        }), responseMock],
        [call(getDateByAdditionalTime, expiresIn), dateOfExpirationMock]
      ])
      .put(authStart())
      .call([localStorage, "setItem"], "token", idToken)
      .call([localStorage, "setItem"], "expirationDate", dateOfExpirationMock)
      .call([localStorage, "setItem"], "userId", localId)
      .put(authSuccess(idToken, localId))
      .put(checkAuthTimeout(expiresIn))
      .run()

    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    expect(localStorage.length).toBe(3);
    expect(localStorage.setItem).toHaveBeenCalledWith("token", idToken);
    expect(localStorage.setItem).toHaveBeenCalledWith("expirationDate", dateOfExpirationMock);
    expect(localStorage.setItem).toHaveBeenCalledWith("userId", localId);
  })
})
