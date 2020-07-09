import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import {
  GifsApi,
  Configuration,
  Gif
} from './generated/giphy';

const PAGE_SIZE = 25;

interface AppState {
  gifs: Gif[];
}

const api = new GifsApi(
  new Configuration({ apiKey: 'a3ZRVRY96IYxu1tJD5hkDDFE9Pac4Vih' })
);

class App extends Component<{}, AppState> {
  state = {
    gifs: [],
  };

  loadMore(n: number) {
    api.trendingGifs({ offset: n * PAGE_SIZE, limit: PAGE_SIZE }).then(r => {
      const currentGifs: Gif[] = this.state.gifs;
      this.setState({ gifs: currentGifs.concat(r.data || []) });
    });
  }

  render() {
    return (
      <div className="App">
        <InfiniteScroll
          pageStart={0}
          initialLoad={true}
          loadMore={n => this.loadMore(n)}
          hasMore={true}
        >
          {
            this.state.gifs.map((gif: Gif) => (
              <img
                style={{
                  width: gif.images?.fixedWidth?.width,
                  height: gif.images?.fixedWidth?.height,
                  display: 'block',
                }}
                src={gif.images?.fixedWidth?.url}
              ></img>
            ))
          }
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
