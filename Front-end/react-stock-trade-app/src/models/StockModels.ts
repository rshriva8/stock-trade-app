class StockModel{
    stockId:number;
    stockName:string;
    stockValue:number;
    stockTicker:number;
    stockVolume:number;

    constructor(stockId:number, stockName:string, stockValue:number, stockTicker:number, stockVolume:number){
        this.stockId=stockId;
        this.stockName=stockName;
        this.stockValue=stockValue;
        this.stockTicker=stockTicker;
        this.stockVolume=stockVolume;
    }
}

export default StockModel