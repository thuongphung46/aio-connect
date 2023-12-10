import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  showLoading,
  hideLoading,
  ShowAlert,
  PxStorage,
} from "~/src/constants/common_function";
import { ResponseData } from "~/src/constants/http_response";
import { all, put, takeLatest } from "redux-saga/effects";
import { CreateSagaAction } from "~/src/redux/common_function";
import { UserService } from "../../services/login";
import { GlobalVariable } from "~/src/constants/global_constant";
import { reset } from "./production_output";
import { IUser } from "~/src/components/molecules/login";

// Define a type for the slice state
interface LoginState {
  auth?: boolean;
  account?: {
    id: string;
    username: string;
  };
}

// Define the initial state using that type
const initialState: LoginState = {
  auth: false,
  account: undefined,
};

// Define Actions
const sliceId = "login";
export const {
  REQUEST_LOGIN,
  FETCH_USER_DATA,
  CHECK_AUTHORIZATION,
  LOGOUT_REQUEST,
} = CreateSagaAction(sliceId, [
  "REQUEST_LOGIN",
  "FETCH_USER_DATA",
  "CHECK_AUTHORIZATION",
  "LOGOUT_REQUEST",
]);
export const Actions = {
  requestLogin: (user_data: IUser, callback: () => void): any => ({
    type: REQUEST_LOGIN,
    payload: {
      user_data,
      callback,
    },
  }),
  logoutRequest: (): any => ({
    type: LOGOUT_REQUEST,
  }),
  checkAuthorization: (): any => ({
    type: CHECK_AUTHORIZATION,
  }),
  fetchUserData: (
    type: "ONCHANGE" | "SUBMIT",
    id: string,
    current_data?: string,
    callback?: (username: string) => void
  ) => ({
    type: FETCH_USER_DATA,
    payload: {
      type,
      id,
      callback,
      current_data,
    },
  }),
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    fetchUserDataResult: (state, action) => {
      state.account = action.payload;
    },
    requestLoginResult: (state, action) => {
      state.auth = action.payload;
    },
    logoutSuccess: (state) => {
      state.auth = false;
    },
    checkAuthorizationResult: (state, action: PayloadAction<any>) => {
      state.auth = action.payload.auth;
    },
  },
});

// Saga
function* requestLoginSaga(action: any) {
  showLoading();
  let permission = false;
  let message = "";
  const { user_data } = action.payload;
  try {
    const response: ResponseData = yield UserService.Login({
      username: user_data.username,
      password: user_data.password,
    });
    const status = response.code === 200;
    if (status) {
      permission = true;
      GlobalVariable.token = response.data.staffId;
      PxStorage.set("token", response.data.staffId);
      if (response.message) message = response.message;
      action.payload.callback && action.payload.callback();
    }
    ShowAlert(
      status ? "SUCCESS" : "ERROR",
      status ? "Đăng nhập thành công" : message ? message : "Đăng nhập thất bại"
    );
  } catch (error) {
    console.log(error);
  }
  yield put(requestLoginResult(permission));
  hideLoading();
  // if (permission)
  //   yield fetchUserDataSaga({
  //     payload: {
  //       type: "SUBMIT",
  //       id: user_data.emp_id,
  //     },
  //   });
}

function* logoutSaga() {
  showLoading();
  GlobalVariable.token = "";
  //reset state
  yield put(reset());
  ShowAlert("SUCCESS", "Đăng xuất thành công");
  yield put(logoutSuccess());
  hideLoading();
}

function* checkAuthorizationSaga() {
  showLoading();
  let return_state: any = {};
  // const token = PxStorage.get("token");
  // return_state.auth = token ? true : false;
  yield put(
    checkAuthorizationResult({
      ...return_state,
    })
  );
  hideLoading();
  // if (!token) redirectToLogin();
}

// function* fetchUserDataSaga(action: any) {
//   const { type, id, current_data } = action.payload;
//   if (type !== "ONCHANGE") showLoading();
//   try {
//     const response: ResponseData = yield UserService.GetUserName({
//       UserId: id,
//     });
//     switch (type) {
//       case "ONCHANGE":
//         let username = current_data;
//         if (response.code === 200) {
//           const response_data: any = response.data[0];
//           username = response_data["U_NAME"];
//         }
//         action.payload.callback && action.payload.callback(username);
//         break;
//       case "SUBMIT":
//         let user_data = {
//           id: "",
//           username: "",
//         };
//         if (response.code === 200) {
//           const response_data: any = response.data[0];
//           user_data = {
//             id: id,
//             username: response_data["U_NAME"],
//           };
//         } else ShowAlert("WARNING", response.message as string);
//         yield put(fetchUserDataResult(user_data));
//         break;
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   hideLoading();
// }

export const {
  requestLoginResult,
  logoutSuccess,
  checkAuthorizationResult,
  fetchUserDataResult,
} = loginSlice.actions;

export const LoginReducer = loginSlice.reducer;

export function* loginWatcher() {
  yield all([
    takeLatest(REQUEST_LOGIN, requestLoginSaga),
    takeLatest(LOGOUT_REQUEST, logoutSaga),
    // takeLatest(FETCH_USER_DATA, fetchUserDataSaga),
    takeLatest(CHECK_AUTHORIZATION, checkAuthorizationSaga),
  ]);
}
