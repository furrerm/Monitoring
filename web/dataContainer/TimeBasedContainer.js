class TimeBasedContainer {

    constructor(properties, timeOfInterest, respectGranularity, label) {

        this.properties = properties;
        this.timeOfInterest = timeOfInterest;
        this.counter = 0;
        this.timeBasedContainers;
        this.label = label;

        if(respectGranularity){

            this.timeBasedContainers = [];

            for (var i = 0; i < this.properties.timeOfInterest.ENTITIES; ++i) {
                this.timeBasedContainers.push(new TimeBasedContainer(this.properties, this.properties.granularity, false, this.properties.timeOfInterest.LABELS[i]))
            }
        }
    }

    save(message) {
        if (this.properties.timeOfInterest === TimeOfInterest.YEAR) {
            this.timeBasedContainers[ message.zeitstempelDate.getMonth()].counter += message.out;
        } else if (this.properties.timeOfInterest === TimeOfInterest.MONTH) {
            this.timeBasedContainers[ message.zeitstempelDate.getDate() - 1].counter  += message.out;
        } else if (this.properties.timeOfInterest === TimeOfInterest.WEEK) {
            this.timeBasedContainers[ DateHelper.shiftWeekday(message.zeitstempelDate.getDay())].counter  += message.out;
        } else if (this.properties.timeOfInterest === TimeOfInterest.DAY) {
            this.timeBasedContainers[ message.hour].counter  += message.out;
        }
    }
}