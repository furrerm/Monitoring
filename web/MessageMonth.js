class MessageMonth {

    constructor(year, month, properties) {
        this.incoming = 0;
        this.outgoing = 0;

        this.properties = properties;
        this.month = month;

        this.latestDay = 0;

        this.days = [];

        this.daysOfMonth = DateHelper.daysInMonth(this.month+1, year);

        for (var i = 0; i < this.daysOfMonth; ++i) {
            this.days.push(new MessageDay(i, this.properties))
        }
    }

    save(message){
        if(message.in === 1){
            ++this.incoming;
        } else if(message.out === 1){
            ++this.outgoing;
        }
        if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb)) {
            if(this.properties.granularity > 1)
            this.days[message.day].save(message);
            if(this.latestDay < message.day){
                this.latestDay = message.day;
            }
        }
    }



}