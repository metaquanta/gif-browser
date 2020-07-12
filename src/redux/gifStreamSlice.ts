import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GifsApi, Configuration } from "../generated/giphy";
import { Dispatch } from "react";
import { slim, SlimGif } from "../SlimGif";

const PAGE_SIZE = 25; // fetch 25 gifs at a time
const api = new GifsApi(
    new Configuration({ apiKey: "a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih" })
);

export type GifStreamState = {
    gifs: SlimGif[];
    request: GifRequest;
};

class GifRequest {
    fetch: () => Promise<GifRequest | undefined>
    offset: number
    query: string | undefined
    gifs: SlimGif[] | undefined

    constructor(offset: number, query?: string) {
        this.offset = offset;
        this.query = query;
        if (typeof query === "string") {
            this.fetch = () => {
                console.log(`loading ${query}`);
                this.fetch = () => Promise.resolve(undefined);
                return api
                    .searchGifs({ offset: offset, limit: PAGE_SIZE, q: query })
                    .then((r) => {
                        this.gifs = (r.data || []).map(slim);
                        return this;
                    });
            }
        } else {
            this.fetch = () => {
                console.log("loading trending");
                this.fetch = () => Promise.resolve(undefined);
                return api
                    .trendingGifs({ offset: offset, limit: PAGE_SIZE })
                    .then((r) => {
                        this.gifs = (r.data || []).map(slim);
                        return this;
                    });
            }
        }
    }

    toString() {
        return `GifRequest(${this.offset}, ${this.query || "trending"})`
    }
}

// Actions:
const requestThunk = createAsyncThunk(
    "requestThunk",
    (request: GifRequest, thunkApi) => request.fetch()
);

// Reducers: (and actions for updateSearchQuery, moarGifs are generated here)
const gifStreamSlice = createSlice({
    name: "gifStream",
    initialState: {
        gifs: [],
        request: new GifRequest(0, new URL(window.location.href).searchParams.get('q') || undefined)
    },
    reducers: {
        // This freshens search stream-related state
        updateSearchQuery(state: GifStreamState, action: PayloadAction<string>) {
            const url = new URL(window.location.href);
            if (action.payload === "" && state.request.query !== undefined) {
                url.searchParams.delete('q');
                state.gifs = [];
                state.request = new GifRequest(0);
            } else if (action.payload !== state.request.query) {
                url.searchParams.set('q', action.payload);
                state.gifs = [];
                state.request = new GifRequest(0, action.payload);
            }
            window.history.pushState({}, window.document.title, url.toString());
        }
    },
    extraReducers: (builder) =>
        // Actions are above
        builder
            .addCase(requestThunk.fulfilled, (state: GifStreamState, action) => {
                if (action.payload === undefined) return;
                if (state.request === action.payload) {
                    state.gifs = state.gifs.concat(action.payload.gifs || []);
                    state.request = new GifRequest(state.gifs.length, state.request.query);
                }
            })
});

export const loadMore = (dispatch: Dispatch<any>, state: GifStreamState) => {
    console.log(`loadMore [${state.request}]`);
    dispatch(requestThunk(state.request));
};

export const updateSearchQuery = (dispatch: Dispatch<any>, state: GifStreamState, query: string) => {
    console.log(`updateSearch(${query})`);
    dispatch(gifStreamSlice.actions.updateSearchQuery(query));
};

export default gifStreamSlice.reducer;
