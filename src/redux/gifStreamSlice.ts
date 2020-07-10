import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    Gif,
    GifsApi,
    Configuration
} from '../generated/giphy';
import { Dispatch } from 'react';

const PAGE_SIZE = 5;

const api = new GifsApi(
    new Configuration({ apiKey: 'a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih' })
);
type GifStreamState = { gifs: Gif[], gifs_requested: number, load_more_gifs: boolean };

const willLoadTrendingGifs = () => ({ type: "willLoadTrendingGifs" });

const loadTrendingGifs = createAsyncThunk('loadTrendingGifs', (offset: number, thunkApi) =>
    api.trendingGifs({ offset, limit: PAGE_SIZE }).then(r =>
        ({ gifs: r.data || [], page: (r.pagination?.totalCount || 0) })))

const gifStreamSlice = createSlice({
    name: 'gifStream',
    initialState: { gifs: [], gifs_requested: 0, load_more_gifs: false },
    reducers: {
        moarGifs(state, action) {
            state.load_more_gifs = true;
        }
    },
    extraReducers: builder =>
        builder.addCase(loadTrendingGifs.fulfilled, (state: GifStreamState, action) => {
            state.load_more_gifs = false;
            state.gifs = state.gifs.concat(action.payload.gifs);
        }).addCase('willLoadTrendingGifs', (state) => {
            state.gifs_requested = state.gifs.length + PAGE_SIZE;
        })
});

function shouldFetchGifs(state: GifStreamState) {
    if (state.gifs.length < state.gifs_requested) return false;
    return true;
}

export const moarGifs = (dispatch: Dispatch<any>, state: GifStreamState) => {
    console.log(`moarGifs() - [gifs.length:${state.gifs.length}, gifs_requested:${state.gifs_requested}]`);
    if (shouldFetchGifs(state)) {
        dispatch(willLoadTrendingGifs());
        dispatch(loadTrendingGifs(state.gifs.length));
    } else {
        dispatch(gifStreamSlice.actions.moarGifs);
    }
}

export default gifStreamSlice.reducer;  
