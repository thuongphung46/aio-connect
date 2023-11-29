import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface productionOutputState {
  selectedRow?: any;
  selectedRowKey?: any;
  dataCardDoc?: any;
  dataCardLine?: any;
  ngQty?: any;
}

// Define the initial state using that type
const initialState: productionOutputState = {};

export const productionOutputSlice = createSlice({
  name: "productionOutput",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setState: (state, action: PayloadAction<productionOutputState>) => {
      return { ...state, ...action.payload };
    },
    updateSelectedRowValue: (
      state,
      action: PayloadAction<{ ok_qty?: string; ng_qty?: string }>
    ) => {
      let data = state.selectedRow;
      data = { ...data, ...action.payload };
      state.selectedRow = data;
    },
    updateDataCardDoc: (
      state,
      action: PayloadAction<{ key?: string; value?: string }>
    ) => {
      let data = state.dataCardDoc;
      let index = data?.findIndex((x: any) => x.key === action.payload.key);
      if (index >= 0) {
        data[index].value = action.payload.value;
      }
      state.dataCardDoc = data;
    },
  },
});

export const { setState, updateSelectedRowValue, reset, updateDataCardDoc } =
  productionOutputSlice.actions;

export const ProductionOutputReducer = productionOutputSlice.reducer;
