class DateHelper {
    constructor() {

    }

    static daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    static getDateFormatted(date) {
        var fullDate = date;
        //console.log(fullDate);
        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours() + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }
        var twoDigitMinutes = fullDate.getMinutes() + "";
        if (twoDigitMinutes.length == 1) {
            twoDigitMinutes = "0" + twoDigitMinutes;
        }
        var twoDigitSeconds = fullDate.getSeconds() + "";
        if (twoDigitSeconds.length == 1) {
            twoDigitSeconds = "0" + twoDigitSeconds;
        }
        var threeDigitMillis = fullDate.getMilliseconds() + "";
        if (twoDigitDate.length == 1) {
            threeDigitMillis = "00" + threeDigitMillis;
        }
        if (twoDigitDate.length == 2) {
            threeDigitMillis = "0" + threeDigitMillis;
        }
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds + "." + threeDigitMillis;
        return currentDate;
    }

    static getbeginOfMinute(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours() + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }

        var twoDigitMinutes = fullDate.getMinutes() + "";
        if (twoDigitMinutes.length == 1) {
            twoDigitMinutes = "0" + twoDigitMinutes;
        }

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getendOfMinute(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours();
        twoDigitHours + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }
        var twoDigitMinutes = fullDate.getMinutes() + "";
        if (twoDigitMinutes.length == 1) {
            twoDigitMinutes = "0" + twoDigitMinutes;
        }

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfHour(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours() + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }
        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getendOfHour(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours();
        twoDigitHours + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }
        var twoDigitMinutes = "59";

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfDay(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = "00";

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getendOfDay(date) {

        var fullDate = date;

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate();
        twoDigitDate + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = "23";

        var twoDigitMinutes = "59";

        var twoDigitSeconds = "59";

        var threeDigitMillis = "999";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfMinuteCounter(counter) {

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = fullDate.getHours() + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }

        var twoDigitMinutes = counter + "";
        if (twoDigitMinutes.length == 1) {
            twoDigitMinutes = "0" + twoDigitMinutes;
        }

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfHourCounter(counter) {

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = fullDate.getDate() + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = counter + "";
        if (twoDigitHours.length == 1) {
            twoDigitHours = "0" + twoDigitHours;
        }

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfDayCounter(counter) {

        var fullDate = new Date();

        var twoDigitMonth = fullDate.getMonth() + 1;
        twoDigitMonth + "";
        if (twoDigitMonth.length == 1) {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        var twoDigitDate = counter + "";
        if (twoDigitDate.length == 1) {
            twoDigitDate = "0" + twoDigitDate;
        }
        var twoDigitHours = "00";

        var twoDigitMinutes = "00";

        var twoDigitSeconds = "00";

        var threeDigitMillis = "000";

        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
        return currentDate;
    }

    static getbeginOfDayDate(date) {

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    }

    static getbeginOfHourDate(date) {

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0)
    }

    static getbeginOfMinuteDate(date) {

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0)
    }

    static getDiffInHours(date1, date2) {

        return ((date1 - date2) / 36e5);
    }

    static isInAWeekAhead(date1, date2) {
        var weekday = this.shiftWeekday(date1.getDay());
        var startOfNextWeek = new Date(date1.getTime());
        startOfNextWeek.setDate(startOfNextWeek.getDate() - weekday + 7);
        startOfNextWeek.setHours(0, 0, 0, 0)

        if (date2 >= startOfNextWeek) {
            return true;
        }
        return false;
    }

    static isInSameWeek(date1, date2) {
        var weekday = this.shiftWeekday(date1.getDay());
        var startOfThisWeek = new Date(date1.getTime());

        startOfThisWeek.setDate(startOfThisWeek.getDate() - weekday);
        startOfThisWeek.setHours(0, 0, 0, 0)


        if (date2 >= startOfThisWeek && !this.isInAWeekAhead(date1, date2)) {
            return true;
        }
        return false;
    }

    static shiftWeekday(weekdayInput) {
        var weekday = weekdayInput;
        weekday--;
        weekday = weekday === -1 ? 6 : weekday;
        return weekday;
    }


    static getWeekNumber(date) {
        var firstOfJan = new Date(date.getFullYear(), 0, 1);
        var dayOfInterest = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var dayOfYear = ((dayOfInterest - firstOfJan + 1) / 86400000);
        return Math.ceil(dayOfYear / 7)
    };

    static getStartInMillisFromEnum(timeOfInterestEnumValue, dateToTest) {
        if (!timeOfInterestEnumValue) {
            throw new Error('Season is not defined')
        }
        var dateNow = new Date(dateToTest.getTime());
        var startOfPeriodDate = new Date(dateToTest.getTime());
        var endOfPeriodDate = new Date(startOfPeriodDate.getTime());
        switch (timeOfInterestEnumValue) {

            case TimeOfInterest.HOUR:
                startOfPeriodDate.setHours(dateNow.getHours(), 0, 0, 0);
                endOfPeriodDate.setHours(TimeOfInterest.HOUR.ENTITIES, 0, 0, 0)
                break;
            case TimeOfInterest.DAY:
                startOfPeriodDate.setHours(0, 0, 0, 0);
                endOfPeriodDate.setHours(TimeOfInterest.DAY.ENTITIES, 0, 0, 0)
                break;
            case TimeOfInterest.WEEK:
                startOfPeriodDate.setDate(dateNow.getDate() - DateHelper.shiftWeekday(dateNow.getDay()));
                startOfPeriodDate.setHours(0, 0, 0, 0);
                endOfPeriodDate.setDate(startOfPeriodDate.getDate() + TimeOfInterest.WEEK.ENTITIES);
                endOfPeriodDate.setHours(0, 0, 0, 0);
                break;
            case TimeOfInterest.MONTH:
                startOfPeriodDate.setDate(1);
                startOfPeriodDate.setHours(0, 0, 0, 0);
                endOfPeriodDate.setDate(TimeOfInterest.MONTH.ENTITIES);
                endOfPeriodDate.setHours(0, 0, 0, 0);
                break;
            case TimeOfInterest.YEAR:
                startOfPeriodDate.setMonth(0);
                startOfPeriodDate.setDate(1);
                startOfPeriodDate.setHours(0, 0, 0, 0);


                endOfPeriodDate.setMonth(TimeOfInterest.YEAR.ENTITIES);
                endOfPeriodDate.setDate(1);
                endOfPeriodDate.setHours(0, 0, 0, 0);
                break;

        }
        console.log(startOfPeriodDate);
        return {von: startOfPeriodDate.getTime(), bis: endOfPeriodDate.getTime()};
    }


    static getSubTimeRangesInMillis(timeOfInterestEnumValue, bezugsdatum) {

        var startOfPeriodDate = new Date(bezugsdatum.getTime());
        var startOfSubPeriodDate = new Date(bezugsdatum.getTime());
        var arrayWithTimeTuples = [];
        switch (timeOfInterestEnumValue) {


            case TimeOfInterest.DAY:

                for (var i = 0; i < TimeOfInterest.DAY.ENTITIES; ++i) {
                    startOfSubPeriodDate.setHours(i, 0, 0, 0);
                    arrayWithTimeTuples[i] = startOfSubPeriodDate.getTime();
                }

                break;
            case TimeOfInterest.WEEK:
                startOfPeriodDate.setDate(startOfPeriodDate.getDate() - DateHelper.shiftWeekday(startOfPeriodDate.getDay()));
                startOfSubPeriodDate.setHours(0, 0, 0, 0);

                for (var i = 0; i < TimeOfInterest.WEEK.ENTITIES; ++i) {
                    startOfSubPeriodDate.setDate(startOfPeriodDate.getDate() + i);
                    arrayWithTimeTuples[i] = startOfSubPeriodDate.getTime();
                }
                break;
            case TimeOfInterest.MONTH:

                startOfSubPeriodDate.setHours(0, 0, 0, 0);

                for (var i = 0; i < TimeOfInterest.MONTH.ENTITIES; ++i) {
                    startOfSubPeriodDate.setDate(1 + i);

                    arrayWithTimeTuples[i] = startOfSubPeriodDate.getTime();
                }
                break;
            case TimeOfInterest.YEAR:
                startOfSubPeriodDate.setMonth(0);
                startOfSubPeriodDate.setDate(1);
                startOfSubPeriodDate.setHours(0, 0, 0, 0);

                for (var i = 0; i < TimeOfInterest.YEAR.ENTITIES; ++i) {
                    startOfSubPeriodDate.setMonth(i);

                    arrayWithTimeTuples[i] = startOfSubPeriodDate.getTime();
                }
                break;

        }
        console.log(arrayWithTimeTuples);
        return arrayWithTimeTuples;
    }

    static getDateStringForPrint(date) {
        var str = "";
        str = str.concat(DateHelper.getWeekdayName(DateHelper.shiftWeekday(date.getDay())));
        str = str.concat(" ");
        str = str.concat(DateHelper.addZeroIfOneDigigt(date.getDate()));
        str = str.concat(".");
        str = str.concat(DateHelper.addZeroIfOneDigigt(date.getMonth()+1));
        str = str.concat(".");
        str = str.concat(DateHelper.addZeroIfOneDigigt(date.getFullYear()));
        str = str.concat("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        str = str.concat(DateHelper.addZeroIfOneDigigt(date.getHours()));
        str = str.concat(":");
        str = str.concat(DateHelper.addZeroIfOneDigigt(date.getMinutes()));
        str = str.concat(" Uhr");

        return str;
    }

    static getDateStringForPrintForFilterContainer(date, filter) {
        if(filter.timeOfInterest === TimeOfInterest.DAY){
            return DateHelper.addZeroIfOneDigigt(date.getDate()) + "." + DateHelper.addZeroIfOneDigigt(date.getMonth()+1) + "." + date.getFullYear();
        }
        else if(filter.timeOfInterest === TimeOfInterest.WEEK ){
            return "Woche "+DateHelper.getWeekNumber(date);
        }
        else if(filter.timeOfInterest === TimeOfInterest.MONTH){
            return DateHelper.getMonthName(date.getMonth()) + " "+date.getFullYear();
        }
        else if(filter.timeOfInterest === TimeOfInterest.YEAR){
            return date.getFullYear();
        }
    }

    static addZeroIfOneDigigt(number) {
        if (number.toString().length == 1) {
            return "0" + number;
        }
        return number;
    }

    static getMonthName(month) {
        var arr = new Array(12);
        arr[0] = "Jan";
        arr[1] = "Feb";
        arr[2] = "Mar";
        arr[3] = "Apr";
        arr[4] = "Mai";
        arr[5] = "Jun";
        arr[6] = "Jul";
        arr[7] = "Aug";
        arr[8] = "Sep";
        arr[9] = "Okt";
        arr[10] = "Nov";
        arr[11] = "Dez";
        return arr[month];
    }
    static getWeekdayName(day) {

        var arr = new Array(7);
        arr[0] = "Montag";
        arr[1] = "Dienstag";
        arr[2] = "Mittwoch";
        arr[3] = "Donnerstag";
        arr[4] = "Freitag";
        arr[5] = "Samstag";
        arr[6] = "Sonntag";

        return arr[day];
    }
}