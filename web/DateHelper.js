class DateHelper{
    constructor() {

    }
    static getDateFormatted(date){
        var fullDate = date;
        //console.log(fullDate);
        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours()+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }
        var twoDigitMinutes = fullDate.getMinutes()+"";
        if(twoDigitMinutes.length==1){
            twoDigitMinutes="0" +twoDigitMinutes;
        }
        var twoDigitSeconds = fullDate.getSeconds()+"";
        if(twoDigitSeconds.length==1){
            twoDigitSeconds="0" +twoDigitSeconds;
        }
        var threeDigitMillis = fullDate.getMilliseconds()+"";
        if(twoDigitDate.length==1){
            threeDigitMillis="00" +threeDigitMillis;
        }
        if(twoDigitDate.length==2){
            threeDigitMillis="0" +threeDigitMillis;
        }
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds+"."+threeDigitMillis;
        return currentDate;
    }
    static getbeginOfMinute(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours()+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }

        var twoDigitMinutes = fullDate.getMinutes()+"";
        if(twoDigitMinutes.length==1){
            twoDigitMinutes="0" +twoDigitMinutes;
        }

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getendOfMinute(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours();
        twoDigitHours+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }
        var twoDigitMinutes = fullDate.getMinutes()+"";
        if(twoDigitMinutes.length==1){
            twoDigitMinutes="0" +twoDigitMinutes;
        }

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }
    static getbeginOfHour(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours()+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }
        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getendOfHour(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours();
        twoDigitHours+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }
        var twoDigitMinutes = "59";

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfDay(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = "00";

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getendOfDay(date){

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate();
        twoDigitDate+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = "23";

        var twoDigitMinutes = "59";

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfMinuteCounter(counter){

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours()+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }

        var twoDigitMinutes = counter+"";
        if(twoDigitMinutes.length==1){
            twoDigitMinutes="0" +twoDigitMinutes;
        }

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }
    static getbeginOfHourCounter(counter){

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = counter+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }
    static getbeginOfDayCounter(counter){

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = counter+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = "00";

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate+" "+twoDigitHours+":"+twoDigitMinutes+":"+twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfDayDate(date){

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    }
    static getbeginOfHourDate(date){

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0)
    }
    static getbeginOfMinuteDate(date){

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0)
    }

    static getDiffInHours(date1, date2){

        return ((date1 - date2) / 36e5);
    }
}