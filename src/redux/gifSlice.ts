import {
    Action,
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
        hideGif(state, action: Action) {
            state.visible = false;
        },
    },
});

export function viewGif(dispatch: Dispatch<PayloadAction<URL>>, url: URL) {
    dispatch(gifSlice.actions.viewGif(url))
}

export function hideGif(dispatch: Dispatch<any>) {
    dispatch(gifSlice.actions.hideGif(undefined));
}

export default gifSlice.reducer;
