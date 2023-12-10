import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root_saga";
import { AppAlertReducer } from "./slices/app_alert";
import { AppLoadingReducer } from "./slices/app_loading";
import { CommonReducer } from "./slices/common";
import { CouterReducer } from "./slices/counter";
import { LoginReducer } from "./slices/login";
import { SelectUserToChatReducer } from "./slices/select_user";
import { MqttReducer } from "./slices/mqtt";
import { ProductionOutputReducer } from "./slices/production_output";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    // reducers go here
    AppAlertReducer,
    CouterReducer,
    LoginReducer,
    SelectUserToChatReducer,
    // AppLoadingReducer,
    // CommonReducer,
    // MqttReducer,
    // ProductionOutputReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});
sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
