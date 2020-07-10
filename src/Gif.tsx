import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideGif } from './redux/gifSlice';
import { RootState } from './redux/rootReducer';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifSlice);
  if (state.visible)
    return <div className="gifViewer">
      <img alt="" src={state.url?.toString()} /><div className="darken" onClick={() => hideGif(dispatch)} />
    </div>
  return <span />
}