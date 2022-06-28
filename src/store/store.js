import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { all } from "@redux-saga/core/effects";
import { buttonSaga } from "./slice/buttonSlice";
import buttonReducer from "./slice/buttonSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { button: buttonReducer },
  middleware: [sagaMiddleware],
  devTools: true,
});

function* rootSaga() {
  yield all([buttonSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
