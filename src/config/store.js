import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase";


import firebaseConfig from "./firebase";

// import rootSaga from "../redux/sagas";
import rootReducer from "../redux/reducers";


/**
 * setting Firebase
 */
firebase.initializeApp(firebaseConfig);
const firebaseConfigOptions = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}


/**
 * setting Middlewares
 * @type {Array}
 */
let middlewares = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

// const sagaMiddleware = createSagaMiddleware();
// middlewares.push(sagaMiddleware);

const store = createStore(
  rootReducer,
  compose(
    reactReduxFirebase(firebase, firebaseConfigOptions),
    applyMiddleware(...middlewares)
  )
);

// sagaMiddleware.run(rootSaga, getFirebase);

// if (module.hot) {
//   module.hot.accept("./reducers", () => {
//     const nextCombineReducers = require("./reducers").default;
//     store.replaceReducer(nextCombineReducers);
//   });
// }

export default store;
