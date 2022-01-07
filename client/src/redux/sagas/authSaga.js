import axios from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_SUCCESS,
} from "../types";

const loginUserAPI = (loginData) => {
  console.log("loginData", loginData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// clear Error

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}
export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchclearError)]);
}
