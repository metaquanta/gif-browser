import InfiniteScroll from 'react-infinite-scroller';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gif } from './generated/giphy';
import { GifStreamState, moarGifs } from './redux/gifStreamSlice';
import { RootState } from './redux/rootReducer';
import { viewGif } from './redux/gifSlice';

const GIF_WIDTH = 200;

const partition = (gifs: Gif[], num: number) => {
  let columns:Gif[][] = (Array(num).fill(0)).map(_=>[]);
  gifs.forEach((g, i) => columns[i % num].push(g));
  return columns;
}

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifStreamSlice);
  return scroller(state, state.gifs, dispatch);
}

const scroller = (state: GifStreamState, gifs: Gif[], dispatch: Dispatch<any>): JSX.Element => <InfiniteScroll
  pageStart={0}
  initialLoad={true}
  loadMore={() => moarGifs(dispatch, state)}
  hasMore={true}
>
  <div style={{
    display: "flex",
    flexDirection: "row"
  }}
  >{partition(state.gifs, Math.floor(window.innerWidth / GIF_WIDTH)).map((gifs, i) => <div key={i}
    style={{
      order: i,
      width: GIF_WIDTH,
      display: "flex",
      flexDirection: "column"
    }}>{gifs.map((g: Gif) => img(g))}</div>)}</div>
</InfiniteScroll>

const img = (gif: Gif): JSX.Element => <img
  style={{
    width: gif.images?.fixedWidth?.width,
    height: gif.images?.fixedWidth?.height,
    display: 'block',
  }}
  onClick={() => viewGif(new URL(gif.images?.original?.url || ""))}
  alt=''
  src={gif.images?.fixedWidth?.url}
/>

