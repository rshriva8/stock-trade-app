
class User {
    id: number;
    balance: number;
    constructor(id:number, balance:number) {
        this.id=id
        this.balance=balance;
    }
}
class Stocks {
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

class OwnershipModel{
    user_stocks_id: number;
    user : User | undefined;
    stocks : Stocks | undefined;
    userStocksVolume: number;

    constructor(user_stocks_id:number, user:User, stocks:Stocks, userStocksVolume:number){
        this.user_stocks_id=user_stocks_id;
        this.user=user;
        this.stocks=stocks;
        this.userStocksVolume=userStocksVolume;
    }
}

export default OwnershipModel