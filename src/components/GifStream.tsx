import InfiniteScroll from 'react-infinite-scroller';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GifStreamState, moarGifs } from '../redux/gifStreamSlice';
import { RootState } from '../redux/rootReducer';
import { viewGif } from '../redux/gifViewerSlice';
import { SlimGif } from '../SlimGif';

const GIF_WIDTH = 200;

const partition = (gifs: SlimGif[], num: number) => {
  let columns: SlimGif[][] = (Array(num).fill(0)).map(_ => []);
  gifs.forEach((g, i) => columns[i % num].push(g));
  return columns;
}

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifStreamSlice);

  return scroller(state, (state.searchQuery ? state.searchGifs : state.trendingGifs), dispatch);
}

const scroller = (state: GifStreamState, gifs: SlimGif[], dispatch: Dispatch<any>): JSX.Element => <InfiniteScroll
  pageStart={0}
  initialLoad={true}
  loadMore={() => moarGifs(dispatch, state)}
  hasMore={true}
>
  <div className="streamRow"
  >{partition(gifs, Math.floor(window.innerWidth / GIF_WIDTH)).map((gifs, i) =>
    <div className="streamColumn" key={i}
      style={{
        order: i,
        width: GIF_WIDTH,
      }}>{gifs.map((g: SlimGif) => img(g, dispatch))}</div>)}</div>
</InfiniteScroll>

const img = (gif: SlimGif, dispatch: Dispatch<any>): JSX.Element => <a className="clickable" onClick={() => {
  console.log(`click(${gif.id})`)
  viewGif(dispatch, new URL(gif.originalUrl || ""))
}}><img
    style={{
      width: gif.width,
      height: gif.height
    }}
    alt=''
    src={gif.fixedWidthUrl}
  /></a>

