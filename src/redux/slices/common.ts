import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

// Define a type for the slice state
export interface commonState {
  activeMenu?: any;
}

// Define the initial state using that type
const initialState: commonState = {};

export const commonSlice = createSlice({
  name: "common",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<commonState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setState } = commonSlice.actions;

export const CommonReducer = commonSlice.reducer;
