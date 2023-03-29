class User {
    id: number;
    constructor(id:number) {
        this.id=id
    }
}
class Stock {
    id: number;
    stockName: string;
    stockValue: number;
    stockTicker: string;
    constructor(id:number, stockName: string,stockValue:number, stockTicker: string) {
        this.id=id;
        this.stockName=stockName;
        this.stockValue=stockValue;
        this.stockTicker=stockTicker;
    }
}

class HistoryModel{
    orderId: number;
    orderType: string;
    orderVolume: number;
    orderTimestamp: string;
    totalPrice: number;
    user : User | undefined;
    stock : Stock | undefined;
    openPrice: number;

    constructor(orderId:number, user:User, stock:Stock, orderVolume:number,orderTimestamp:string,totalPrice:number,orderType:string, openPrice:number){
        this.orderId=orderId;
        this.user=user;
        this.stock=stock;
        this.orderVolume=orderVolume;
        this.orderTimestamp=orderTimestamp;
        this.totalPrice=totalPrice;
        this.orderType=orderType;
        this.openPrice=openPrice;
    }
}

export default HistoryModel;