// import "@babel/polyfill"
// import "core-js/es6/promise"

// import "tee-loader!./klondike/scoring.js";  Inline Loader (babel-loader then tee loader)
// import "!!tee-loader!./klondike/scoring.js";  Overrides all loaders (just tee-loader)
// import "!!tee-loader!babel-loader!./klondike/scoring.js";  Overrides all loaders (babel then tee loader

import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

angular.module("solitaire", ["klondike", "ngDraggable"]);