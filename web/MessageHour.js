class MessageHour {

    constructor(timestamp) {
        this.timestamp = timestamp;
        this.messageCounter = 0;

        this.minutes = [];

        for (var i = 0; i < 60; ++i) {
            this.minutes.push(new MessageMinute(i))
        }
    }


    addHourData(message, time) {

        this.messageCounter++;

        var messageMinute = time.getMinutes();

        this.minutes[messageMinute].addMinuteData(message, time);
    }

    getMinuteMessages(date) {

        var minute = date.getMinutes();

        return this.minutes[minute].messages;

    }
}