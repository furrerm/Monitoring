class Message{
    constructor(message){
        this.zeitstempelString = message.time;
        this.zeitstempelDate = new Date(message.time);

        this.year = this.zeitstempelDate.getFullYear();
        this.month = this.zeitstempelDate.getMonth();
        this.day = DateHelper.shiftWeekday(this.zeitstempelDate.getDay());
        this.hour = this.zeitstempelDate.getHours();


        this.beginOfDayString = DateHelper.getbeginOfDay(this.zeitstempelDate);
        this.beginOfHourString = DateHelper.getbeginOfHour(this.zeitstempelDate);
        this.beginOfMinuteString = DateHelper.getbeginOfMinute(this.zeitstempelDate);

        this.gui = message.gui;
        this.korb = message.korb;
        this.ambulant = message.ambulant;
        this.stationaer = message.stationaer;
        this.partnerartObergruppe = message.partnerartObergruppe;
        this.plz = message.plz;
        this.korbstand = message.korbstand;
        this.in = message.in;
        this.out = message.out;
    }
}