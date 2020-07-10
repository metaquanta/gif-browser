import { createSlice, createAsyncThunk, Action, PayloadAction } from "@reduxjs/toolkit";
import { Gif, GifsApi, Configuration } from "../generated/giphy";
import { Dispatch } from "react";
import { slim, SlimGif } from "../SlimGif";

const PAGE_SIZE = 25;

const api = new GifsApi(
    new Configuration({ apiKey: "a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih" })
);

export type GifStreamState = {
    trendingGifs: SlimGif[];
    searchGifs: SlimGif[];
    searchQuery: string | undefined;
    trendingGifsRequested: number;
    searchGifsRequested: number;
    loadMoreTrendingGifs: boolean;
    loadMoreSearchGifs: boolean;
};

const willLoadTrendingGifs = () => ({ type: "willLoadTrendingGifs" });
const willLoadSearchGifs = () => ({ type: "willLoadSearchGifs" });

const loadTrendingGifs = createAsyncThunk(
    "loadTrendingGifs",
    (offset: number, thunkApi) => api
        .trendingGifs({ offset, limit: PAGE_SIZE })
        .then((r) => ({
            gifs: r.data || [],
            page: r.pagination?.offset || 0,
        }))
);

const loadSearchGifs = createAsyncThunk(
    "loadSearchGifs",
    ({ offset, q }: { offset: number, q: string }, thunkApi) => api
        .searchGifs({ offset, limit: PAGE_SIZE, q })
        .then((r) => ({
            gifs: r.data || [],
            page: r.pagination?.offset || 0,
        }))
);

const gifStreamSlice = createSlice({
    name: "gifStream",
    initialState: {
        trendingGifs: [],
        searchGifs: [],
        searchQuery: undefined,
        trendingGifsRequested: 0, loadMoreTrendingGifs: false,
        searchGifsRequested: 0, loadMoreSearchGifs: false
    },
    reducers: {
        moarGifs(state: GifStreamState, action: Action) {
            if (state.searchQuery) state.loadMoreSearchGifs = true;
            else state.loadMoreTrendingGifs = true;
        },
        updateSearchQuery(state: GifStreamState, action: PayloadAction<string>) {
            if (action.payload == "") state.searchQuery = undefined;
            else state.searchQuery = action.payload;
            state.searchGifsRequested = 0;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadTrendingGifs.fulfilled, (state: GifStreamState, action) => {
                state.loadMoreTrendingGifs = false;
                if (action.payload.page == state.trendingGifs.length) {
                    state.trendingGifs = state.trendingGifs.concat(action.payload.gifs.map(slim));
                }
            })
            .addCase("willLoadTrendingGifs", (state) => {
                state.trendingGifsRequested = state.trendingGifs.length + PAGE_SIZE;
            })
            .addCase(loadSearchGifs.fulfilled, (state: GifStreamState, action) => {
                state.loadMoreSearchGifs = false;
                if (action.payload.page == 0) {
                    state.searchGifs = action.payload.gifs.map(slim);
                } else if (action.payload.page == state.searchGifs.length) {
                    state.searchGifs = state.searchGifs.concat(action.payload.gifs.map(slim));
                } else {
                    console.log(`Orphaned request [${state.searchGifs.length}]: ${action.payload.page}`);
                }
            })
            .addCase("willLoadSearchGifs", (state) => {
                state.searchGifsRequested = state.searchGifs.length + PAGE_SIZE;
            }),
});

function shouldFetchTrendingGifs(state: GifStreamState) {
    if (state.trendingGifs.length < state.trendingGifsRequested) return false;
    return true;
}

function shouldFetchSearchGifs(state: GifStreamState) {
    if (state.searchGifs.length < state.searchGifsRequested) return false;
    return true;
}

export const moarGifs = (dispatch: Dispatch<any>, state: GifStreamState) => {
    if (state.searchQuery) {
        if (shouldFetchSearchGifs(state)) {
            dispatch(willLoadSearchGifs());
            dispatch(loadSearchGifs({ offset: state.searchGifs.length, q: state.searchQuery }));
        } else {
            dispatch(gifStreamSlice.actions.moarGifs);
        }
    } else {
        if (shouldFetchTrendingGifs(state)) {
            dispatch(willLoadTrendingGifs());
            dispatch(loadTrendingGifs(state.trendingGifs.length));
        } else {
            dispatch(gifStreamSlice.actions.moarGifs);
        }
    }
};

export const dispatchSearch = (dispatch: Dispatch<any>, state: GifStreamState, query: string) => {
    dispatch(gifStreamSlice.actions.updateSearchQuery(query));
    moarGifs(dispatch, state);
};

export default gifStreamSlice.reducer;
