# gif-browser

Minimalist Giphy interface. An infinite stream of dense-twichiness.

## Live Demo: https://gifs.metaquanta.com

Click any gif or use the input field to search (don't forget to hit **enter**)

This project is built on Create-React-App's Typescript template. It also uses API-client code built with OpenAPI and a schema from [APIs-guru](https://github.com/APIs-guru/openapi-directory)

It is fully plumbed with Redux. Certainly horribly. Trying (and failing) to figure out how Redux outght to be used in something like this occupied the vast majority of my time.

Other difficult decisions tended to fall into the same broad category as, "Should I use this tool, a different tool, or none at all." 

- I had the page infinite-scrolling within minutes thanks to [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller)
- The OpenAPI library's value is a bit harder to determine because, at first, it generated garbage code without explanation
- Then I failed to find an off-the-shelf search component with instant-search/suggestions etc. 

## TODO

- ### Re-wire Redux the right way. 
  - (assuming there is a right way)
  - [Redux Saga](https://redux-saga.js.org/) looks much better then Thunk for the infinite stream of gifs
- ### Write tests
  - Depends on the above
- ### Instant search/search suggestions
- Loading indicators
- CSS reboot
- Some text to accompany the gifs might be helpful
- and much much more
