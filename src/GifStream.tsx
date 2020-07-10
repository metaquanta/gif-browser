import InfiniteScroll from 'react-infinite-scroller';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gif } from './generated/giphy';
import { GifStreamState, moarGifs } from './redux/gifStreamSlice';
import { RootState } from './redux/rootReducer';
import { viewGif } from './redux/gifSlice';

const GIF_WIDTH = 200;

const partition = (gifs: Gif[], num: number) => {
  let columns: Gif[][] = (Array(num).fill(0)).map(_ => []);
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
  <div className="streamRow"
  >{partition(state.gifs, Math.floor(window.innerWidth / GIF_WIDTH)).map((gifs, i) => <div className="streamColumn" key={i}
    style={{
      order: i,
      width: GIF_WIDTH,
    }}>{gifs.map((g: Gif) => img(g, dispatch))}</div>)}</div>
</InfiniteScroll>

const img = (gif: Gif, dispatch: Dispatch<any>): JSX.Element => <a className="clickable" onClick={() => {
  console.log(`click(${gif.id})`)
  viewGif(dispatch, new URL(gif.images?.original?.url || ""))
}}><img
    style={{
      width: gif.images?.fixedWidth?.width,
      height: gif.images?.fixedWidth?.height
    }}
    alt=''
    src={gif.images?.fixedWidth?.url}
  /></a>

