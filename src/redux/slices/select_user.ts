import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

// Define a type for the slice state
export interface ItemState {
  id: number;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  isDeleted?: number;
  status?: number;
  type?: number;
  staffId?: number;
  chatId?: number;
  chatName?: string;
}

// Define the initial state using that type
const initialState: ItemState = {
  //khởi tạo tất cả null
  id: 1,
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
  isDeleted: undefined,
  staffId: undefined,
  chatId: undefined,
  chatName: "",
  type: undefined,
  status: undefined,
};

export const selectUserToChatSlice = createSlice({
  name: "select",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    setState: (state, action: PayloadAction<ItemState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setState } = selectUserToChatSlice.actions;

export const SelectUserToChatReducer = selectUserToChatSlice.reducer;
