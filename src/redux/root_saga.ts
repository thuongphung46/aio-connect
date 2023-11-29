import { all } from "redux-saga/effects";
import { counterWatcher } from "./slices/counter";
import { loginWatcher } from "./slices/login";

export function* rootSaga() {
  yield all([counterWatcher(), loginWatcher()]);
}
