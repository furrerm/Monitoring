class MessageHour {

    constructor() {
        this.incoming = 0;
        this.outgoing = 0;
    }

    save(message) {
        if(message.in === 1){
            ++this.incoming;
        } else if(message.out === 1){
            ++this.outgoing;
        }
    }
}