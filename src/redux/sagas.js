import { all, fork } from "redux-saga/effects";

import {
  watchQuoteList,
} from "./modules/quotes/listSaga";

export default function* rootSaga(getFirebase) {
  // console.log(getFirebase)
  try {
    yield getFirebase().push('/quotes', { nice: 'work!' })
  } catch(err) {
    console.log('Error in saga!:', err)
  }
  // yield all([
  //   // quote
  //   fork(watchQuoteList),

  // ]);
}
