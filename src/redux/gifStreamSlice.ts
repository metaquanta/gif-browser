import { createSlice, createAsyncThunk, ActionCreatorWithPayload, Action } from "@reduxjs/toolkit";
import { Gif, GifsApi, Configuration } from "../generated/giphy";
import { Dispatch } from "react";

const PAGE_SIZE = 25;

const api = new GifsApi(
    new Configuration({ apiKey: "a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih" })
);

export type GifStreamState = {
    gifs: Gif[];
    gifsRequested: number;
    loadMoreGifs: boolean;
    width: number;
};

const willLoadTrendingGifs = () => ({ type: "willLoadTrendingGifs" });

const loadTrendingGifs = createAsyncThunk(
    "loadTrendingGifs",
    (offset: number, thunkApi) =>
        api
            .trendingGifs({ offset, limit: PAGE_SIZE })
            .then((r) => ({
                gifs: r.data || [],
                page: r.pagination?.totalCount || 0,
            }))
);

const gifStreamSlice = createSlice({
    name: "gifStream",
    initialState: { gifs: [], gifsRequested: 0, loadMoreGifs: false, width: 0 },
    reducers: {
        moarGifs(state, action: Action) {
            state.loadMoreGifs = true;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadTrendingGifs.fulfilled, (state: GifStreamState, action) => {
                state.loadMoreGifs = false;
                state.gifs = state.gifs.concat(action.payload.gifs);
            })
            .addCase("willLoadTrendingGifs", (state) => {
                state.gifsRequested = state.gifs.length + PAGE_SIZE;
            }),
});

function shouldFetchGifs(state: GifStreamState) {
    if (state.gifs.length < state.gifsRequested) return false;
    return true;
}

export const moarGifs = (dispatch: Dispatch<any>, state: GifStreamState) => {
    if (shouldFetchGifs(state)) {
        dispatch(willLoadTrendingGifs());
        dispatch(loadTrendingGifs(state.gifs.length));
    } else {
        dispatch(gifStreamSlice.actions.moarGifs);
    }
};

export default gifStreamSlice.reducer;
