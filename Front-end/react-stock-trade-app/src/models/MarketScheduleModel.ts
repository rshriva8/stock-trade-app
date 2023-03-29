class MarketScheduleModel{
    id:number;
    openDaysOfWeek:string;
    openingTime:Date;
    closingTime:Date;

    constructor(id:number, openDaysOfWeek:string, openingTime:Date, closingTime:Date){
        this.id=id;
        this.openDaysOfWeek=openDaysOfWeek;
        this.openingTime=openingTime;
        this.closingTime=closingTime;
    }
}

export default MarketScheduleModel