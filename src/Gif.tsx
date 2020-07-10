import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifSlice);
  if(state.visible)
    return <div style={{position:"fixed"}}><img alt="" src={state.url?.toString()} /></div>
  return <span />
}