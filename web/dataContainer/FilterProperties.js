class FilterProperties {

    constructor(timeOfInterest, koerbe, guis) {
       this.timeOfInterest = timeOfInterest;
       this.koerbe = koerbe;
       this.guis = guis;
       this.granularity = this.getGranularity(timeOfInterest);
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