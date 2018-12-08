class MessageDay {

    constructor(date, message) {
        this.messageCounter = 0;
        this.date = date;
        this.hours = [];
        this.messagesPerHour = [];
        this.time = message.zeitstempelDate;


        var timestamp;

        for (var i = 0; i < 24; ++i) {

            timestamp = this.getTime(i);

            this.messagesPerHour.push({
                value: [
                    timestamp,
                    0
                ]
            });
            this.hours.push(new MessageHour(timestamp))
        }
        this.addDayMessage(message, message.zeitstempelDate);
    }


    addDayMessage(message, time) {

        this.messageCounter++;

        var messageHour = time.getHours();

        this.hours[messageHour].addHourData(message, time);
        this.messagesPerHour[messageHour].value[1]++;

    }

    getTime(counter) {
        var counterString = counter + "";
        if (counterString.length < 2) {
            counterString = "0" + counterString;
        }

        var timestamp = this.time.getFullYear() + "-" + (this.time.getMonth() + 1) + "-" + this.time.getUTCDate() + " " + counterString + ":" + "00" + ":" + "00";
        return timestamp;
    }

    getHour(date) {

        var twoDigitMonth = date.getMonth()+1;
        twoDigitMonth+"";
        if(twoDigitMonth.length==1){
            twoDigitMonth="0" +twoDigitMonth;
        }
        var twoDigitDate = date.getDate()+"";
        if(twoDigitDate.length==1){
            twoDigitDate="0" +twoDigitDate;
        }
        var twoDigitHours = date.getHours()+"";
        if(twoDigitHours.length==1){
            twoDigitHours="0" +twoDigitHours;
        }

        for (var i = 0; i < this.hours.length; ++i) {
            //console.log(this.hours[i].timestamp);
            //console.log(date.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate + " " + twoDigitHours+":00:00")

            if (this.hours[i].timestamp === date.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate + " " + twoDigitHours+":00:00") {
                return this.hours[i];
            }
        }
    }

}