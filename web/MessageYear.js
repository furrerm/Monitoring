class MessageYear {

    constructor(timestamp, properties) {

        this.properties = properties;
        this.year = timestamp.getFullYear();
        this.latestMonth = 0;

        this.months = [];

        for (var i = 0; i < 12; ++i) {
            this.months.push(new MessageMonth(this.year, i, this.properties))
        }
    }

    save(message) {
        if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb)) {
            this.months[message.month].save(message);
            if(this.latestMonth < message.month){
                this.latestMonth = month;
            }
        }
    }
}