class MessageData {

    constructor() {
        this.days = [];
        this.lineChart1Data = [];
        this.gaugeChart1Data = 0;
        this.gaugeChart2Data = 0;
        this.gaugeChart3Data = 0;
        //[entry Number, z-axe, value = bubble size, bubble-label, type, x-label, date]
        this.bubbleChart1Data = [
            [[0, 0, 0, '', 0, 0, new Date(2000, 0, 0, 0, 0, 0, 0)], [1, 0, 0, '', 0, 1, new Date(2000, 0, 0, 0, 0, 0, 0)], [2, 0, 0, '', 0, 2, new Date(2000, 0, 0, 0, 0, 0, 0)], [3, 0, 0, '', 0, 3, new Date(2000, 0, 0, 0, 0, 0, 0)], [4, 0, 0, '', 0, 4, new Date(2000, 0, 0, 0, 0, 0, 0)], [5, 0, 0, '', 0, 5, new Date(2000, 0, 0, 0, 0, 0, 0)], [6, 0, 0, '', 0, 6, new Date(2000, 0, 0, 0, 0, 0, 0)], [7, 0, 0, '', 0, 7, new Date(2000, 0, 0, 0, 0, 0, 0)], [8, 0, 0, '', 0, 8, new Date(2000, 0, 0, 0, 0, 0, 0)], [9, 0, 0, '', 0, 9, new Date(2000, 0, 0, 0, 0, 0, 0)], [10, 0, 0, '', 0, 10, new Date(2000, 0, 0, 0, 0, 0, 0)], [11, 0, 0, '', 0, 11, new Date(2000, 0, 0, 0, 0, 0, 0)]],
        ];
        this.bubbleChartXAxe = ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '];

        this.updateArrays(filterProperties);
        this.biggestValueInBubbleChart = 0;

        this.korbstaende = [];

        for (var i = 0; i < 8; ++i) {
            this.korbstaende.push(0);
        }


    }


    addSingleMessage(message) {


        this.addDataToLineChart(message, filterProperties);
        this.addDataToBubbleChart(message, filterProperties);
        //this.addDataToBubbleChart2(message, filterProperties);
        this.addToGaugeChart1(message, filterProperties);
        this.addToGaugeChart2(message, filterProperties);
        this.addToGaugeChart3(message, filterProperties);

        if (this.days.length === 0) {
            this.days.push(new MessageDay(message.beginOfDayString, message, message.zeitstempelDate));
            return;
        }

        for (var i = 0; i < this.days.length; i++) {

            if (this.days[i].date === message.beginOfDayString) {
                this.days[i].addDayMessage(message, message.zeitstempelDate);
            }
            return;
        }

        if (messageIsStored === false && message.zeitstempelDate > new Date(this.days[this.days.length - 1].date)) {
            this.days.push(new MessageDay(message.beginOfDayString, message, message.zeitstempelDate));
            if (this.days.length > 8) {
                this.days.shift();
            }
        }
    }

    addArrayMessage(messages) {
        message.forEach(function (item, index) {
            this.addSingleMessage(item);
        });
    }

    getDay(date) {
        for (var i = 0; i < this.days.length; ++i) {

            if (this.days[i].date === date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getUTCDate() + " " + "00:00:00") {
                return this.days[i];
            }
        }
        return null;
    }

    addToGaugeChart1(message, properties) {

        var date = new Date();
        if (properties.zeitspanne === "1") {

            if (message.zeitstempelDate >= DateHelper.getbeginOfHourDate(new Date()) && message.zeitstempelDate < DateHelper.getbeginOfHourDate(new Date(date.getTime() + 36e5))) {
                if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb) && message.in === 1) {
                    this.gaugeChart1Data++;
                }
            }
        }

        if (properties.zeitspanne === "2") {


            if (message.zeitstempelDate >= DateHelper.getbeginOfDayDate(new Date()) && message.zeitstempelDate < DateHelper.getbeginOfDayDate(new Date(date.getTime() + 24 * 36e5))) {
                if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb) && message.in === 1) {
                    this.gaugeChart1Data++;
                }
            }
        }
    }

    addToGaugeChart3(message, properties) {
        var date = new Date();
        if (properties.zeitspanne === "1") {

            if (message.zeitstempelDate >= DateHelper.getbeginOfHourDate(new Date()) && message.zeitstempelDate < DateHelper.getbeginOfHourDate(new Date(date.getTime() + 36e5))) {

                if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb) && message.out === 1) {

                    this.gaugeChart3Data++;
                }
            }
        }
        if (properties.zeitspanne === "2") {

            if (message.zeitstempelDate >= DateHelper.getbeginOfDayDate(new Date()) && message.zeitstempelDate < DateHelper.getbeginOfDayDate(new Date(date.getTime() + 24 * 36e5))) {

                if (properties.guis.includes(message.gui.toString()) && properties.koerbe.includes(message.korb) && message.out === 1) {
                    this.gaugeChart3Data++;
                }
            }
        }
    }


    addToGaugeChart2(message, properties) {

        //@todo funktioniert natürlich nicht mit den richtigen koerben.
        var value = 0;

        for (var i = 0; i < 8; ++i) {

            if ("Korb" + i === message.korb) {
                this.korbstaende[i] = message.korbstand;

            }
            if (properties.koerbe.includes("Korb" + i)) {
                value += this.korbstaende[i];
            }

        }


        this.gaugeChart2Data = value;


    }

    addDataToBubbleChart(message, properties) {
        //@todo hier muesste der zeitstempel von jetzt uebergeben werden also new Date() anstatt message.zeitstempelDate
        var messageDateBeginOfHour = DateHelper.getbeginOfHourDate(message.zeitstempelDate);
        var diffInHours = DateHelper.getDiffInHours(messageDateBeginOfHour, this.bubbleChart1Data[0][11][6]);
        if (diffInHours > 0) { // Ist für das shifting verantwortlich
            for (var i = 0; i <= 11; ++i) {
                if (i + diffInHours <= 11) {
                    this.bubbleChart1Data[0][i] = this.bubbleChart1Data[0][i + diffInHours];
                    this.bubbleChartXAxe[i] = this.bubbleChartXAxe[i + diffInHours];

                    this.bubbleChart1Data[0][i][0] = i;
                }
                else {
                    var date = new Date(messageDateBeginOfHour - ((11 - i) * 36e5));
                    this.bubbleChart1Data[0][i] = [i, 0, 0, '', 0, 0, date];
                    this.bubbleChartXAxe[i] = date.getHours() + " - " + (date.getHours() + 1);

                }
            }
        }
        if (diffInHours > (-12)) { // mit > -12 kann in den dargestellten 12 Stunden die Bubbles angepasst werden.
            this.biggestValueInBubbleChart = 0;
            for (var i = 0; i <= 11; ++i) {
// if (message.beginOfMinuteString === this.lineChart1Data[i].value[0] && message.out === 1) {
                // >= wandelt date in number was einen vergleich ermöglicht der mit === nicht funktioniert.
                if (this.bubbleChart1Data[0][i][6] >= messageDateBeginOfHour && this.bubbleChart1Data[0][i][6] <= messageDateBeginOfHour) {
                    if (properties.koerbe.includes(message.korb) && properties.guis.includes(message.gui.toString()) && message.out === 1) {
                        this.bubbleChart1Data[0][i][2]++;
                    }
                }
                // biggestValueInBubbleChart wird für skalierung der bubbles benötigt.
                if (this.bubbleChart1Data[0][i][2] > this.biggestValueInBubbleChart) {
                    this.biggestValueInBubbleChart = this.bubbleChart1Data[0][i][2];
                }
            }
        }
/*
        if (properties.koerbe.includes(message.korb) && properties.guis.includes(message.gui.toString()) && message.out === 1) {
            this.bubbleChart1Data[0][i][2]++;
        }
        */
    }

    addDataToBubbleChart2(message, properties) {
        //@todo hier muesste der zeitstempel von jetzt uebergeben werden also new Date() anstatt message.zeitstempelDate
        var messageDateBeginOfHour = DateHelper.getbeginOfHourDate(message.zeitstempelDate);
        //var diffInHours = DateHelper.getDiffInHours(messageDateBeginOfHour, this.bubbleChart1Data[0][11][6]);

        this.biggestValueInBubbleChart = 0;
        for (var i = 0; i <= 11; ++i) {

            // >= wandelt date in number was einen vergleich ermöglicht der mit === nicht funktioniert.
            if ((this.bubbleChart1Data[0][i][6] >= messageDateBeginOfHour && this.bubbleChart1Data[0][i][6] <= messageDateBeginOfHour)
                || (this.bubbleChart1Data[0][i][6] >= new Date(2000, 0, 0, 0, 0, 0, 0) && this.bubbleChart1Data[0][i][6] <= new Date(2000, 0, 0, 0, 0, 0, 0))
            ) {
                if (properties.koerbe.includes(message.korb) && properties.guis.includes(message.gui.toString()) && message.out === 1) {
                    this.bubbleChart1Data[0][i][2]++;
                    this.bubbleChart1Data[0][i][6] = messageDateBeginOfHour;
                }
//this.bubbleChart1Data[0][i][1]++;

                break;
            }
        }
        for (var i = 0; i <= 11; ++i) {
            // biggestValueInBubbleChart wird für skalierung der bubbles benötigt.
            if (this.bubbleChart1Data[0][i][2] > this.biggestValueInBubbleChart) {
                this.biggestValueInBubbleChart = this.bubbleChart1Data[0][i][2];
            }
        }
    }

    addDataToLineChart(message, properties) {

        if (properties.zeitspanne === "1") {
            //setInterval2(DateHelper.getbeginOfHour(message.zeitstempelDate), DateHelper.getendOfHour(message.zeitstempelDate));

            for (var i = 0; i < 60; ++i) {
                if (message.beginOfMinuteString === this.lineChart1Data[i].value[0] && message.out === 1) {
                    if (properties.koerbe.includes(message.korb) && properties.guis.includes(message.gui.toString())) {
                        this.lineChart1Data[i].value[1]++;
                    }
                }
            }
        }
        if (properties.zeitspanne === "2") {
            //setInterval2(DateHelper.getbeginOfDay(message.zeitstempelDate), DateHelper.getendOfDay(message.zeitstempelDate));

            for (var i = 0; i < 24; ++i) {
                if (message.beginOfHourString === this.lineChart1Data[i].value[0] && message.out === 1) {
                    if (properties.koerbe.includes(message.korb) && properties.guis.includes(message.gui.toString())) {
                        this.lineChart1Data[i].value[1]++;
                    }
                }
            }
        }
    }

    updateBubblesArray() {

    }

    updateArrays(properties) {

        this.lineChart1Data = [];
        var amount;

        if (properties.zeitspanne === "1") {

            setInterval2(DateHelper.getbeginOfHour(new Date()), DateHelper.getendOfHour(new Date()));
            var minutes = this.getMinutesFromSpecificHour(new Date());

            for (var i = 0; i < 60; ++i) {
                amount = 0;
                if (minutes != null) {
                    amount = this.getMessageAmountFromSpecificMinute(minutes[i], properties, {in: 0, out: 1});
                }
                this.lineChart1Data.push({
                    value: [
                        DateHelper.getbeginOfMinuteCounter(i),
                        amount
                    ]
                });
            }
        }
        else if (properties.zeitspanne === "2") {

            setInterval2(DateHelper.getbeginOfDay(new Date()), DateHelper.getendOfDay(new Date()));

            var hours = this.getHoursFromSpecificDate(new Date());

            for (var i = 0; i < 24; ++i) {
                amount = 0;
                if (hours != null) {
                    amount = this.getMessageAmountFromSpecificHour(hours[i], properties, {in: 0, out: 1});
                }
                this.lineChart1Data.push({
                    value: [
                        DateHelper.getbeginOfHourCounter(i),
                        amount
                    ]
                });
            }
        }
    }

    updateGaugeChart1(properties) {


        this.gaugeChart1Data = 0;

        var amount;

        if (properties.zeitspanne === "1") {

            var minutes = this.getMinutesFromSpecificHour(new Date());

            for (var i = 0; i < 60; ++i) {
                amount = 0;
                if (minutes != null) {
                    amount = this.getMessageAmountFromSpecificMinute(minutes[i], properties, {in: 1, out: 0});
                }
                this.gaugeChart1Data += amount;
            }
        }
        else if (properties.zeitspanne === "2") {

            var hours = this.getHoursFromSpecificDate(new Date());

            for (var i = 0; i < 24; ++i) {
                amount = 0;
                if (hours != null) {
                    amount = this.getMessageAmountFromSpecificHour(hours[i], properties, {in: 1, out: 0});
                }
                this.gaugeChart1Data += amount;
            }
        }
    }

    updateGaugeChart2(properties) {

        this.gaugeChart2Data = 0;

        var korbstaende = this.getLastKorbstand(new Date(), properties);

        this.gaugeChart2Data = this.getSumOfArray(korbstaende);
    }

    updateGaugeChart3(properties) {

        this.gaugeChart3Data = 0;

        var amount;

        if (properties.zeitspanne === "1") {

            var minutes = this.getMinutesFromSpecificHour(new Date());

            for (var i = 0; i < 60; ++i) {
                amount = 0;
                if (minutes != null) {
                    amount = this.getMessageAmountFromSpecificMinute(minutes[i], properties, {in: 0, out: 1});
                }
                this.gaugeChart3Data += amount;
            }
        }
        else if (properties.zeitspanne === "2") {

            var hours = this.getHoursFromSpecificDate(new Date());

            for (var i = 0; i < 24; ++i) {
                amount = 0;
                if (hours != null) {
                    amount = this.getMessageAmountFromSpecificHour(hours[i], properties, {in: 0, out: 1});
                }
                this.gaugeChart3Data += amount;
            }
        }
    }

    getLastKorbstand(startDate, properties) {

        var koerbe = properties.koerbe.slice();

        var korbstaende = [];

        for (var i = 0; i < koerbe.length; ++i) {
            korbstaende.push(0);
        }

        var i = 0;
        var messages = this.getMessagesFromSpecificMinute(new Date(startDate - 6e4 * i));

        while (messages != null) {


            for (var j = 1; j <= messages.length; ++j) {

                for (var korbNummer = 0; korbNummer < koerbe.length; ++korbNummer) {

                    if (korbstaende[korbNummer] === 0 && koerbe[korbNummer] === messages[messages.length - j].korb) {
                        korbstaende[korbNummer] = messages[messages.length - j].korbstand;
                        if (!korbstaende.includes(0)) {
                            return korbstaende;
                        }
                    }
                }
            }
            ++i;
            messages = this.getMessagesFromSpecificMinute(new Date(startDate - 6e4 * i));

        }

        return korbstaende;
    }

    getHoursFromSpecificDate(date) {
        if (this.getDay(new Date()) != null) {
            return this.getDay(new Date()).hours;
        }
        return null;
    }

    getMinutesFromSpecificHour(date) {
        if (this.getDay(new Date()) != null && this.getDay(new Date()).getHour(new Date()) != null) {
            var g = this.getDay(new Date()).getHour(new Date()).minutes;
            return g;
        }
        return null;
    }

    getMessagesFromSpecificMinute(date) {

        if (this.getDay(date) != null && this.getDay(date).getHour(date) != null) {
            return this.getDay(date).getHour(date).getMinuteMessages(date);
        }
        return null;
    }

    getMessageAmountFromSpecificMinute(minute, properties, messageType = {in: 1, out: 1}) {
        var counter = 0;
        for (var a = 0; a < minute.messages.length; ++a) {
            if (properties.guis.includes(minute.messages[a].gui.toString()) && properties.koerbe.includes(minute.messages[a].korb) && (messageType.in === minute.messages[a].in || messageType.out === minute.messages[a].out)) {
                ++counter;
            }
        }
        return counter;
    }

    getMessageAmountFromSpecificHour(hour, properties, messageType = {in: 1, out: 1}) {
        var counter = 0;
        var minutes = hour.minutes;
        for (var i = 0; i < 60; ++i) {
            for (var a = 0; a < minutes[i].messages.length; ++a) {
                if (properties.guis.includes(minutes[i].messages[a].gui.toString()) && properties.koerbe.includes(minutes[i].messages[a].korb) && (messageType.in === minutes[i].messages[a].in || messageType.out === minutes[i].messages[a].out)) {
                    ++counter;
                }
            }
        }
        return counter;
    }

    getLastKorbstandFromSpecificMinute(minute, properties, korbstaende) {

        for (var a = 0; a < minute.messages.length; ++a) {
            if (properties.koerbe.includes(minute.messages[a].korb)) {
                for (var j = 0; j < korbstaende.length; ++j) {
                    if (properties.koerbe[j] === minute.messages[a].korb) {
                        korbstaende[j] = minute.messages[a].korbstand;
                    }
                }
            }
        }
        return (korbstaende);
    }

    getLastKorbstandFromSpecificHour(hour, properties, korbstaende) {

        var minutes = hour.minutes;
        for (var i = 0; i < 60; ++i) {
            for (var a = 0; a < minutes[i].messages.length; ++a) {
                if (properties.koerbe.includes(minutes[i].messages[a].korb)) {
                    for (var j = 0; j < korbstaende.length; ++j) {

                        if (properties.koerbe[j] === minutes[i].messages[a].korb) {
                            korbstaende[j] = minutes[i].messages[a].korbstand;
                        }
                    }
                }
            }
        }


        return (korbstaende);
    }

    getSumOfArray(arr) {
        var counter = 0;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] >= 0) {
                counter += arr[i];
            }
        }
        return counter;
    }

}