class TimeBasedContainer {

    constructor(properties, timeOfInterest, respectGranularity, label) {

        this.properties = properties;
        this.timeOfInterest = timeOfInterest;
        this.counter = 0;
        this.timeBasedContainers;
        this.label = label;
console.log(this.label);

        if(respectGranularity){

            this.timeBasedContainers = [];

            for (var i = 0; i < this.properties.timeOfInterest.ENTITIES; ++i) {
                console.log("label "+timeOfInterest.LABELS[i])
                this.timeBasedContainers.push(new TimeBasedContainer(this.properties, this.properties.granularity, false, this.properties.timeOfInterest.LABELS[i]))
            }
        }
    }

    save(message) {
        if (this.properties.timeOfInterest === TimeOfInterest.YEAR) {
            this.timeBasedContainers[ message.zeitstempelDate.getMonth()].counter++;
        } else if (this.properties.timeOfInterest === TimeOfInterest.MONTH) {
            this.timeBasedContainers[ message.zeitstempelDate.getDate() - 1].counter++;
        } else if (this.properties.timeOfInterest === TimeOfInterest.WEEK) {
            this.timeBasedContainers[ DateHelper.shiftWeekday(message.zeitstempelDate.getDay())].counter++;
        } else if (this.properties.timeOfInterest === TimeOfInterest.DAY) {
            this.timeBasedContainers[ message.zeitstempelDate.getHours()].counter++;
        }
    }
}