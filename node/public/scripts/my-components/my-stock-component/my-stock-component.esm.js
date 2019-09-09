import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-9cc8904a.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["my-spinner",[[1,"my-spinner"]]],["my-stock-finder",[[1,"my-stock-finder",{"searchResults":[32],"loading":[32]}]]],["my-stock-price",[[1,"my-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[32,"mySymbolSelected","onStockSymbolSelected"]]]]]], options);
});
