import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AppLoadingState {
  visible?: boolean;
  message?: string;
}

// Define the initial state using that type
const initialState: AppLoadingState = {
  visible: false,
};

export const appLoadingSlice = createSlice({
  name: "appLoading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    show: (state, action: PayloadAction<AppLoadingState>) => {
      state.visible = true;
      if (action.payload.message) {
        state.message = action.payload.message;
      }
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

export const { show, hide } = appLoadingSlice.actions;

export const AppLoadingReducer = appLoadingSlice.reducer;
