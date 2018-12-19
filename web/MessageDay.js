class MessageDay {

    constructor(day, properties) {

        this.incoming = 0;
        this.outgoing = 0;

        this.properties = properties;
        this.day = day;

        this.hours = [];

        for (var i = 0; i < 24; ++i) {
            this.hours.push(new MessageHour(i, this.properties))
        }
    }

    save(message) {
        if(message.in === 1){
            ++this.incoming;
        } else if(message.out === 1){
            ++this.outgoing;
        }
    }
}