class DataContainer {

    constructor(properties) {

        this.properties = properties;

        this.outgoing;
        this.incoming;
        this.korbstaende = 0;

        this.newestMessage;
    }

    save(message) {


        console.log(this.newestMessage);
        if ((this.properties.guis.includes(message.gui) && this.properties.koerbe.includes(message.korb))
            || (typeof message.gui === 'undefined' && typeof message.korb === 'undefined')) {
            if (this.properties.timeOfInterest.ID === TimeOfInterest.YEAR.ID) {
                console.log("here 1");
                if (typeof this.newestMessage === 'undefined' || this.newestMessage.getFullYear() < message.zeitstempelDate.getFullYear()) {
                    this.outgoing = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, true, message.zeitstempelDate.getFullYear());
                    this.incoming = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, false, message.zeitstempelDate.getFullYear());
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                } else if (typeof this.newestMessage !== 'undefined' && this.newestMessage.getFullYear() === message.zeitstempelDate.getFullYear()) {
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                }
            } else if (this.properties.timeOfInterest.ID === TimeOfInterest.MONTH.ID) {
                console.log("here 2");
                if (typeof this.newestMessage === 'undefined' || this.newestMessage.getMonth() < message.zeitstempelDate.getMonth() || this.newestMessage.getFullYear() < message.zeitstempelDate.getFullYear()) {
                    this.outgoing = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, true, TimeOfInterest.YEAR.LABELS[message.zeitstempelDate.getMonth()]);
                    this.incoming = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, false, TimeOfInterest.YEAR.LABELS[message.zeitstempelDate.getMonth()]);
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                } else if (typeof this.newestMessage !== 'undefined' && this.newestMessage.getMonth() === message.zeitstempelDate.getMonth() && this.newestMessage.getFullYear() === message.zeitstempelDate.getFullYear()) {
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                }
            } else if (this.properties.timeOfInterest.ID === TimeOfInterest.WEEK.ID) {
                if(typeof this.newestMessage !== 'undefined'){
                    console.log("ahead? = "+DateHelper.isInAWeekAhead(this.newestMessage, message.zeitstempelDate));
                    console.log("in same ? = "+DateHelper.isInSameWeek(this.newestMessage, message.zeitstempelDate));
                }
                if (typeof this.newestMessage === 'undefined' || DateHelper.isInAWeekAhead(this.newestMessage, message.zeitstempelDate)) {
                    this.outgoing = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, true, DateHelper.getWeekNumber(message.zeitstempelDate));
                    this.incoming = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, false, DateHelper.getWeekNumber(message.zeitstempelDate));
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                } else if (typeof this.newestMessage !== 'undefined' && DateHelper.isInSameWeek(this.newestMessage, message.zeitstempelDate)) {
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                }
            } else if (this.properties.timeOfInterest.ID === TimeOfInterest.DAY.ID) {
                if (typeof this.newestMessage === 'undefined' || this.newestMessage.getDate() < message.zeitstempelDate.getDate() || this.newestMessage.getMonth() < message.zeitstempelDate.getMonth() || this.newestMessage.getFullYear() < message.zeitstempelDate.getFullYear()) {
                    this.outgoing = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, true, TimeOfInterest.MONTH.LABELS[message.zeitstempelDate.getDate()-1]);
                    this.incoming = new TimeBasedContainer(this.properties, this.properties.timeOfInterest, false, TimeOfInterest.MONTH.LABELS[message.zeitstempelDate.getDate()-1]);
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                } else if (typeof this.newestMessage !== 'undefined' && this.newestMessage.getDate() === message.zeitstempelDate.getDate() && this.newestMessage.getMonth() === message.zeitstempelDate.getMonth() && this.newestMessage.getFullYear() === message.zeitstempelDate.getFullYear()) {
                    if (message.in > 0) {
                        this.incoming.counter += message.in;
                    } else if (message.out > 0) {
                        this.outgoing.counter += message.out;
                        this.outgoing.save(message);
                    }
                }
            }
            if (message.in > 0) {
                this.korbstaende += message.in;
            } else if (message.out > 0) {
                this.korbstaende -= message.out;
            }
            if (this.newestMessage < message.zeitstempelDate || typeof this.newestMessage === 'undefined') {
                this.newestMessage = message.zeitstempelDate;
            }
        }
    }

    initialize() {

    }

}