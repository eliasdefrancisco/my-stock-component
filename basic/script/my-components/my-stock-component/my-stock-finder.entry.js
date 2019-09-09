import { r as registerInstance, c as createEvent, h } from './core-9cc8904a.js';
import { A as AV_API_KEY } from './global-d647191b.js';

const StockFinder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchResults = [];
        this.loading = false;
        this.mySymbolSelected = createEvent(this, "mySymbolSelected", 7);
    }
    onFindStocks(event) {
        event.preventDefault();
        this.loading = true;
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
            this.searchResults = parsedRes['bestMatches'].map(match => {
                return { name: match['2. name'], symbol: match['1. symbol'] };
            });
            this.loading = false;
        })
            .catch(err => {
            console.log(err);
            this.loading = false;
        });
    }
    onSelectSymbol(symbol) {
        this.mySymbolSelected.emit(symbol);
    }
    render() {
        let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)))));
        if (this.loading) {
            content = h("my-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), h("button", { type: "submit" }, "Find")),
            content
        ];
    }
    static get style() { return ":host {\n    font-family: sans-serif;\n    border: 2px solid var(--color-primary, black);\n    margin: 2rem;\n    padding: 1rem;\n    display: block;\n    width: 20rem;\n    max-width: 100%;\n}\n\nform input {\n    font: inherit;\n    color: var(--color-primary, black);\n    padding: 0.1rem 0.25rem;\n    margin-bottom: 0.5rem;\n    display: block;\n}\n\nform input:focus,\nform button:focus {\n    outline: none;\n}\n\nform button {\n    font: inherit;\n    padding: 0.25rem 0.5rem;\n    border: 1px solid var(--color-primary, black);\n    background: var(--color-primary, black);\n    color: var(--color-primary-inverse, white);\n    cursor: pointer;\n}\n\nform button:hover,\nform button:active {\n    background: var(--color-primary-highlight, grey);\n    border-color: var(--color-primary-highlight, grey);\n}\n\nform button:disabled {\n    background: #ccc;\n    border-color: #ccc;\n    color: white;\n    cursor: not-allowed;\n}\n\nul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\nli {\n    margin: 0.25rem 0;\n    padding: 0.25rem ;\n    border: 1px solid #ccc;\n    cursor: pointer;\n}\n\nli:hover,\nli:active {\n    background: #3b013b;\n    color: whitesmoke\n}"; }
};

export { StockFinder as my_stock_finder };
