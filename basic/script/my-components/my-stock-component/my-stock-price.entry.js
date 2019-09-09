import { r as registerInstance, h, H as Host } from './core-9cc8904a.js';
import { A as AV_API_KEY } from './global-d647191b.js';

const StockPrice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stockInputValid = false;
        this.loading = false;
    }
    stockSymbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }
    onUserInput(event) {
        this.stockUserInput = event.target.value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    }
    onFetchStockPrice(event) {
        event.preventDefault();
        this.stockSymbol = this.stockInput.value;
        // this.fetchStockPrice(stockSymbol)
    }
    componentWillLoad() {
        console.log('componentWillLoad');
        console.log(this.stockSymbol);
    }
    componentDidLoad() {
        console.log('componentDidLoad');
        if (this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        // this.initialStockSymbol = this.stockSymbol
        // if (this.initialStockSymbol !== this.stockSymbol) {
        //     this.fetchStockPrice(this.stockSymbol)
        // }
    }
    componentDidUnload() {
        console.log('componentDidUnload');
    }
    onStockSymbolSelected(event) {
        console.log('Listen event in stock-price component: ', event.detail);
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }
    fetchStockPrice(stockSymbol) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
            if (res.status !== 200) {
                throw new Error('Invalid!');
            }
            return res.json();
        })
            .then(parsedRes => {
            // console.log(parsedRes)
            if (!parsedRes['Global Quote'] || !parsedRes['Global Quote']['05. price']) {
                throw new Error('Invalid symbol!');
            }
            this.error = null;
            this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            this.loading = false;
        })
            .catch(err => {
            this.error = err.message;
            this.fetchedPrice = null;
            this.loading = false;
        });
    }
    hostData() {
        return { class: this.error ? 'error' : '' };
    }
    __stencil_render() {
        let dataContent = h("p", null, "Please enter a symbol!");
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.fetchedPrice) {
            dataContent = h("p", null, "Price: ", this.fetchedPrice);
        }
        if (this.loading) {
            dataContent = h("my-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            h("div", null, dataContent)
        ];
    }
    static get watchers() { return {
        "stockSymbol": ["stockSymbolChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n    font-family: sans-serif;\n    border: 2px solid #3b013b;\n    margin: 2rem;\n    padding: 1rem;\n    display: block;\n    width: 20rem;\n    max-width: 100%;\n}\n\n:host(.error) {\n    border-color: orangered;\n}\n\nform input {\n    font: inherit;\n    color: #3b013b;\n    padding: 0.1rem 0.25rem;\n    margin-bottom: 0.5rem;\n    display: block;\n}\n\nform input:focus,\nform button:focus {\n    outline: none;\n}\n\nform button {\n    font: inherit;\n    padding: 0.25rem 0.5rem;\n    border: 1px solid #3b013b;\n    background: #3b013b;\n    color: white;\n    cursor: pointer;\n}\n\nform button:hover,\nform button:active {\n    background: #ac00ac;\n    border-color: #ac00ac;\n}\n\nform button:disabled {\n    background: #ccc;\n    border-color: #ccc;\n    color: white;\n    cursor: not-allowed;\n}"; }
};

export { StockPrice as my_stock_price };
