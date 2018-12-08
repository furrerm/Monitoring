class MessageMinute {

    constructor(minute) {
        this.minute = minute;
        this.messageCounter = 0;
        this.messages = [];
    }


    addMinuteData(message, time) {

        this.messageCounter++;

        this.messages.push(message);
        this.messages.sort(function (a, b) {
            return a.zeitstempelDate - b.zeitstempelDate;
        });

    }

}