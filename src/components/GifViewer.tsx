import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { hideGif } from '../redux/gifViewerSlice';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifSlice);
  if (state.visible) {
    return <div className="gifViewer">
      <img alt="" src={state.url?.toString()} />
      <div className="darken" onClick={() => hideGif(dispatch)} />
    </div>
  }
  return <span />
}