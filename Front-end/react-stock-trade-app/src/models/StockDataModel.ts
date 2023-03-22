class StockDataModel{
    id:number;
    name:string;
    ticker:string;
    price:number;
    dailyLow:number;
    dailyHigh:number;
    volume:number;

    constructor(id:number, name:string, ticker:string, price:number, dailyLow:number, dailyHigh:number, volume:number){
        this.id=id;
        this.name=name;
        this.ticker=ticker;
        this.price=price;
        this.dailyLow=dailyLow;
        this.dailyHigh=dailyHigh;
        this.volume=volume;
    }
}

export default StockDataModel