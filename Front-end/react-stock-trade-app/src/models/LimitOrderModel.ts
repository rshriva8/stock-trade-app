
class User {
    id: number;
    constructor(id:number) {
        this.id=id
    }
}
class Stocks {
    id: number;
    stockName: string;
    stockValue: number;
    stockTicker:string;
    constructor(id:number, stockName: string,stockValue:number,stockTicker:string) {
        this.id=id;
        this.stockName=stockName;
        this.stockValue=stockValue;
        this.stockTicker=stockTicker;
    }
}

class LimitOrderModel{
    id: number;
    user : User | undefined;
    stock : Stocks | undefined;
    orderType: string;
    orderVolume: number;
    desiredPrice: number;
    moneyHeld: number;
    expiryDate: Date;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

    constructor(id:number, user:User, stock:Stocks,orderType: string,orderVolume: number,desiredPrice: number,moneyHeld: number,
        expiryDate: Date,status: string, dateCreated: Date,lastUpdated: Date){
        this.id=id;
        this.user=user;
        this.stock=stock;
        this.orderType=orderType
        this.orderVolume=orderVolume
        this.desiredPrice=desiredPrice
        this.moneyHeld=moneyHeld
        this.expiryDate=expiryDate
        this.status=status
        this.dateCreated=dateCreated
        this.lastUpdated=lastUpdated
    }
}

export default LimitOrderModel