import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { all, put, takeLatest } from "redux-saga/effects";
import { CreateSagaAction, sleep } from "../common_function";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

const sliceId = "counter";
export const { FETCH_NUMBER } = CreateSagaAction(sliceId, ["FETCH_NUMBER"]);
export const Actions = {
  fetchNumber: (): any => ({
    type: FETCH_NUMBER,
  }),
};
export const counterSlice = createSlice({
  name: sliceId,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const CouterReducer = counterSlice.reducer;

function* fetchNumber({ payload }: any) {
  try {
    let result: void = yield sleep(200);
    let test = Math.floor(Math.random() * 10);
    yield put(incrementByAmount(test));
  } catch (e) {
    yield put({ type: "NUMBER_SAGA_FAILED" });
  }
}

export function* counterWatcher() {
  yield all([takeLatest(FETCH_NUMBER, fetchNumber)]);
}
