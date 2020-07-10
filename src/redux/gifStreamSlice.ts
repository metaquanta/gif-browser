import { createSlice, createAsyncThunk, Action, PayloadAction } from "@reduxjs/toolkit";
import { GifsApi, Configuration } from "../generated/giphy";
import { Dispatch } from "react";
import { slim, SlimGif } from "../SlimGif";

const PAGE_SIZE = 25; // fetch 25 gifs at a time
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

// Actions:
const loadTrendingGifs = createAsyncThunk(
    "loadTrendingGifs",
    (offset: number, thunkApi) => api
        .trendingGifs({ offset, limit: PAGE_SIZE })
        .then((r) => ({
            gifs: r.data || [],
            offset: r.pagination?.offset || 0,
        }))
);

const loadSearchGifs = createAsyncThunk(
    "loadSearchGifs",
    ({ offset, q }: { offset: number, q: string }, thunkApi) => api
        .searchGifs({ offset, limit: PAGE_SIZE, q })
        .then((r) => ({
            gifs: r.data || [],
            offset: r.pagination?.offset || 0,
        }))
);

// Actions dispached before fetching
const willLoadTrendingGifs = () => ({ type: "willLoadTrendingGifs" });
const willLoadSearchGifs = () => ({ type: "willLoadSearchGifs" });

// Reducers: (and actions for updateSearchQuery, moarGifs are generated here)
const gifStreamSlice = createSlice({
    name: "gifStream",
    initialState: {
        trendingGifs: [],
        searchGifs: [],
        searchQuery: undefined,
        trendingGifsRequested: 0,
        loadMoreTrendingGifs: false,
        searchGifsRequested: 0,
        loadMoreSearchGifs: false
    },
    reducers: {
        // This sets state indicating GifStream wants more Gifs to keep it infinite
        moarGifs(state: GifStreamState, action: Action) {
            if (state.searchQuery) state.loadMoreSearchGifs = true;
            else state.loadMoreTrendingGifs = true;
        },
        // This freshens search stream-related state
        updateSearchQuery(state: GifStreamState, action: PayloadAction<string>) {
            if (action.payload == "") state.searchQuery = undefined;
            else state.searchQuery = action.payload;
            state.searchGifsRequested = 0;
            state.searchGifs = [];
            state.trendingGifsRequested = 0;
            state.trendingGifs = [];
        }
    },
    extraReducers: (builder) =>
        // Actions are above
        builder
            .addCase(loadTrendingGifs.fulfilled, (state: GifStreamState, action) => {
                state.loadMoreTrendingGifs = false;
                if (action.payload.offset == 0) {
                    state.trendingGifs = action.payload.gifs.map(slim);
                } else if (action.payload.offset == state.trendingGifs.length) {
                    state.trendingGifs = state.trendingGifs.concat(action.payload.gifs.map(slim));
                } else {
                    console.log(`Orphaned request [${state.trendingGifs.length}]: ${action.payload.offset} try again?`);
                }
            })
            .addCase(loadSearchGifs.fulfilled, (state: GifStreamState, action) => {
                state.loadMoreSearchGifs = false;
                if (action.payload.offset == 0) {
                    state.searchGifs = action.payload.gifs.map(slim);
                } else if (action.payload.offset == state.searchGifs.length) {
                    state.searchGifs = state.searchGifs.concat(action.payload.gifs.map(slim));
                } else {
                    console.log(`Orphaned request [${state.searchGifs.length}]: ${action.payload.offset} try again?`);
                }
            })
            .addCase("willLoadSearchGifs", (state) => {
                state.searchGifsRequested = state.searchGifs.length + PAGE_SIZE;
            })
            .addCase("willLoadTrendingGifs", (state) => {
                state.trendingGifsRequested = state.trendingGifs.length + PAGE_SIZE;
            })
});

// Try not to send duplicate requests just because the GifStream is impatient
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
