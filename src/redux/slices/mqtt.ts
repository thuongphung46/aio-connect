import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MqttClient } from "precompiled-mqtt";

// Define a type for the slice state
export interface MqttState {
  client?: MqttClient;
  message?: any;
  topic?: any;
}

// Define the initial state using that type
const initialState: MqttState = {};

export const mqttSlice = createSlice({
  name: "mqtt",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<MqttState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setState } = mqttSlice.actions;

export const MqttReducer = mqttSlice.reducer;
