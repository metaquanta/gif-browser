import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gif } from './generated/giphy';
import { moarGifs } from './redux/gifStreamSlice';
import { RootState } from './redux/rootReducer';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifStreamSlice);

  return <InfiniteScroll
    pageStart={0}
    initialLoad={true}
    loadMore={n => dispatch(moarGifs(n))}
    hasMore={true}
  >
    {
      state.gifs.map((gif: Gif) => (
        <img
          style={{
            width: gif.images?.fixedWidth?.width,
            height: gif.images?.fixedWidth?.height,
            display: 'block',
          }}
          alt=''
          src={gif.images?.fixedWidth?.url}
        />
      ))
    }
  </InfiniteScroll>;
}