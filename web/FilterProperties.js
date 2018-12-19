class FilterProperties {

    //DaysEnum = Object.freeze({"HOURLY":1, "DAYLY":2, "MONTHLY":3});

    constructor(timeOfInterest, koerbe, guis) {
       this.timeOfInterest = timeOfInterest;
       this.koerbe = koerbe;
       this.guis = guis;
       this.granularity = this.getGranularity(timeOfInterest);
       //this.granularity =

    }
    getGranularity(zeitspanne){
        if(zeitspanne === TimeOfInterest.DAY){
            //Tagesbeginn
            return TimeOfInterest.HOUR;
            //hourly
        }
        else if(zeitspanne === TimeOfInterest.WEEK ){
            //Wochenbeginn Monatsbeginn
            return TimeOfInterest.DAY;
            //2 = daily
        }
        else if(zeitspanne === TimeOfInterest.MONTH){
            //Wochenbeginn Monatsbeginn
            return TimeOfInterest.DAY;
            //2 = daily
        }
        else if(zeitspanne === TimeOfInterest.YEAR){
            //Jahresbeginn
            return TimeOfInterest.MONTH;
            //monthly
        }
    }

}