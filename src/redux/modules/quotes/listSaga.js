import axios from "axios";
import { takeLatest, takeEvery, call, put } from "redux-saga/effects";

import get from "lodash/get";
import capitalize from "lodash/capitalize";

import {
  QUOTES_FETCH_REQUEST,
  QUOTES_FETCH_FAILED,
  QUOTES_FETCH_LOADING,
  QUOTES_FETCH_SUCCESS,

} from "./listAction";

import {
  quotesListAPI,
} from "../../../config/api";


//fetch quotes list
export function* watchQuotesFetch() {
  yield takeEvery(QUOTES_FETCH_REQUEST, quotesFetch);
}

export function* quotesFetch(action) {
  yield put({ type: QUOTES_FETCH_LOADING });
  const { err, res } = yield call(quotesFetchApi);
  if (!res) {
    yield put({
      type: QUOTES_FETCH_FAILED,
      error: "Get quotes list failed."
    });
    return;
  }
  yield put({ type: QUOTES_FETCH_SUCCESS, data: res });
}

function quotesFetchApi() {
  return axios
    .get(quotesListAPI())
    .then(res => ({
      res: res.data
    }))
    .catch(err => ({
      err
    }));
}
