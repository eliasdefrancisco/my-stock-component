import { Component, h } from "@stencil/core";

@Component({
    tag: 'my-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    apikey = 'Q6V3K6756DWWTM11' // Temporary api key from Alpha Vantage

    onFetchStockPrice(event: Event) {
        event.preventDefault()
        console.log('Submitted!')
    }

    render() {
        return [
            <form onSubmit={ this.onFetchStockPrice }>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: { 0 }</p>
            </div>
        ]
    }
}