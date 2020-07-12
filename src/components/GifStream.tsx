import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { GifStreamState, loadMore } from '../redux/gifStreamSlice';
import { viewGif } from '../redux/gifViewerSlice';
import { RootState } from '../redux/rootReducer';
import { SlimGif } from '../SlimGif';

const GIF_WIDTH = 200; // Observed width of "fixed_width" gifs

const partition = (gifs: SlimGif[], num: number) => {
  let columns: SlimGif[][] = (Array(num).fill(0)).map(_ => []);
  gifs.forEach((g, i) => columns[i % num].push(g));
  return columns;
}

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifStreamSlice);
  return <div className="streamRow">
    {partition(state.gifs, Math.floor(window.innerWidth / GIF_WIDTH)).map((gifs, i) => 
      scroller(state, gifs, dispatch) 
    )}
  </div>
}

const scroller = (state: GifStreamState, gifs: SlimGif[], dispatch: Dispatch<any>): JSX.Element =>
  <div className="streamColumn" style={{ width: GIF_WIDTH }}>
    <InfiniteScroll
      pageStart={0}
      initialLoad={true}
      loadMore={(p) => {
        console.log(`loadMore(${p})`)
        loadMore(dispatch, state)
      }}
      hasMore={true}
    >
      {gifs.map((g: SlimGif) => img(g, dispatch))}
    </InfiniteScroll>
  </div>

const img = (gif: SlimGif, dispatch: Dispatch<any>): JSX.Element =>
  <button className="clickable" onClick={() => {
    console.log(`click(${gif.id})`)
    viewGif(dispatch, new URL(gif.originalUrl || ""))
  }}>
    <img style={{ width: gif.width, height: gif.height }} alt="" src={gif.fixedWidthUrl} />
  </button>

