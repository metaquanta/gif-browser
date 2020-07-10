import React from 'react';
import GifViewer from './GifViewer';
import GifStream from './GifStream';
import SearchBar from './SearchBar';

export default function App() {
  return (
    <div className="App">
      <GifViewer />
      <GifStream />
      <SearchBar />
    </div>
  );
}