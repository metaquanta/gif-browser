import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updateSearchQuery } from '../redux/gifStreamSlice';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gifStreamSlice);
  return <form onSubmit={(e) => {
    e.preventDefault();
    const input: HTMLElement | null = document.getElementById('q');
    if (input && input instanceof HTMLInputElement) {
      console.log("query: " + input.value);
      updateSearchQuery(dispatch, state, input.value);
    }
  }}>
    <input id="q" className="search" name="q" autoFocus={true} />
  </form>
}