import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";

// Define a type for the slice state
export type AlertType = "SUCCESS" | "ERROR" | "WARNING";
export interface AppAlertState {
  message: string;
  type: AlertType;
  visible?: boolean;
  alertId?: string;
}

// Define the initial state using that type
const initialState: AppAlertState = {
  message: "",
  type: "SUCCESS",
  visible: false,
};

export const appAlertSlice = createSlice({
  name: "appAlert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    show: (state, action: PayloadAction<AppAlertState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
      state.alertId = uniqueId("alert-");
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

export const { show, hide } = appAlertSlice.actions;

export const AppAlertReducer = appAlertSlice.reducer;
