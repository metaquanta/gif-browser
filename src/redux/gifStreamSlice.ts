import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    Gif,
    GifsApi,
    Configuration
} from '../generated/giphy';

type GifStreamState = { gifs: Gif[], page_requested: number, page_loaded: number };

const PAGE_SIZE = 25;

const api = new GifsApi(
    new Configuration({ apiKey: 'a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih' })
);

// TODO: fix page count stuff
const fetchTrendingGifs = (page: number) =>
    api.trendingGifs({ offset: page * PAGE_SIZE }).then(r =>
        ({ gifs: r.data || [], page: (r.pagination?.totalCount || 0) / PAGE_SIZE }));

// TODO: fix page count stuff
export const moarGifs = createAsyncThunk('moarGifs', (page: number, thunkApi) =>
    fetchTrendingGifs(page))

const gifStreamSlice = createSlice({
    name: 'gifStream',
    initialState: { gifs: [], page_requested: 0, page_loaded: 0 },
    reducers: {},
    extraReducers: builder =>
        builder.addCase(moarGifs.fulfilled, (state: GifStreamState, action) => {
            state.gifs = state.gifs.concat(action.payload.gifs);
            state.page_loaded = action.payload.page;
        })
});

export default gifStreamSlice.reducer;  
