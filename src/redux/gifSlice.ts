import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { Dispatch } from "react";

export type GifState = { url?: URL; visible: boolean };

const gifSlice = createSlice<GifState, SliceCaseReducers<GifState>>({
  name: "gif",
  initialState: { visible: false },
  reducers: {
    viewGif(state, action: PayloadAction<URL>) {
      state.url = action.payload;
      state.visible = true;
    },
    closeGif(state, action) {
      state.visible = false;
    },
  },
});

export function viewGif(url: URL) {}

export default gifSlice.reducer;
