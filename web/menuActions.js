/*

$("#time1").click(function () {


    var myObject = new Object();

    date1 = new Date();


    myObject.begin = getbeginOfHour(new Date());
    myObject.end = getendOfHour(new Date());

    var begin = JSON.stringify(myObject);



    setInterval2(myObject.begin, myObject.end);

});

$( "#time2" ).click(function() {

    var myObject = new Object();
    date1 = new Date();

    myObject.begin = getbeginOfDay(date1);
    myObject.end = getendOfDay(date1);

    var myString = JSON.stringify(myObject);

    setInterval2(myObject.begin,myObject.end);

});
*/
$(".update").click(function () {


    updateProperties();


});
function updateProperties(){
    var guis = [];
    var koerbe = $("#korbMultiSelector").val();
    var zeitspanne = 1;

    koerbe = $("#korbMultiSelector").val();
    zeitspanne = $(".zeitspanne:checked").val();
    var val3 = $(".guicheckboxes:checkbox:checked").each(function () {

        guis.push($(this).val());
    });

    //console.log(["korb1", "mmm"]);

    filterProperties.guis = guis;
    filterProperties.koerbe = koerbe;
    filterProperties.zeitspanne = zeitspanne;

    messageDataContainer.updateArrays(filterProperties);
    messageDataContainer.updateGaugeChart1(filterProperties);
    messageDataContainer.updateGaugeChart2(filterProperties);
    messageDataContainer.updateGaugeChart3(filterProperties);

    drawGraph1(messageDataContainer);

    updateGauge3(messageDataContainer.gaugeChart1Data);
    updateGauge6(messageDataContainer.gaugeChart2Data);
    updateGauge4(messageDataContainer.gaugeChart3Data);

    var myObject = new Object();


    date1 = new Date();


    myObject.begin = getbeginOfHour(new Date());
    myObject.end = getendOfHour(new Date());

    var begin = JSON.stringify(myObject);


//create cookies

    var selectedKoerbe = [];
    for (var i = 0; i < koerbe.length; ++i) {
        selectedKoerbe.push({'korbName': koerbe[i]})
    }
    $.cookie("koerbe", JSON.stringify(selectedKoerbe));

    var selectedGuis = [];
    for (var i = 0; i < guis.length; ++i) {
        selectedGuis.push({'guiName': guis[i]})
    }
    $.cookie("guis", JSON.stringify(selectedGuis));
    $.cookie("zeitspanne", zeitspanne);
}

function getDateFormatted(date) {
    var fullDate = date;
    //console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = fullDate.getHours() + "";
    if (twoDigitHours.length == 1) {
        twoDigitHours = "0" + twoDigitHours;
    }
    var twoDigitMinutes = fullDate.getMinutes() + "";
    if (twoDigitMinutes.length == 1) {
        twoDigitMinutes = "0" + twoDigitMinutes;
    }
    var twoDigitSeconds = fullDate.getSeconds() + "";
    if (twoDigitSeconds.length == 1) {
        twoDigitSeconds = "0" + twoDigitSeconds;
    }
    var threeDigitMillis = fullDate.getMilliseconds() + "";
    if (twoDigitDate.length == 1) {
        threeDigitMillis = "00" + threeDigitMillis;
    }
    if (twoDigitDate.length == 2) {
        threeDigitMillis = "0" + threeDigitMillis;
    }
    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds + "." + threeDigitMillis;
    return currentDate;
}

function getbeginOfMinute(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = fullDate.getHours() + "";
    if (twoDigitHours.length == 1) {
        twoDigitHours = "0" + twoDigitHours;
    }

    var twoDigitMinutes = fullDate.getMinutes() + "";
    if (twoDigitMinutes.length == 1) {
        twoDigitMinutes = "0" + twoDigitMinutes;
    }

    var twoDigitSeconds = "00";

    var threeDigitMillis = "000";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}

function getendOfMinute(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = fullDate.getHours();
    twoDigitHours + "";
    if (twoDigitHours.length == 1) {
        twoDigitHours = "0" + twoDigitHours;
    }
    var twoDigitMinutes = fullDate.getMinutes() + "";
    if (twoDigitMinutes.length == 1) {
        twoDigitMinutes = "0" + twoDigitMinutes;
    }

    var twoDigitSeconds = "59";

    var threeDigitMillis = "999";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}

function getbeginOfHour(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = fullDate.getHours() + "";
    if (twoDigitHours.length == 1) {
        twoDigitHours = "0" + twoDigitHours;
    }
    var twoDigitMinutes = "00";

    var twoDigitSeconds = "00";

    var threeDigitMillis = "000";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}

function getendOfHour(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = fullDate.getHours();
    twoDigitHours + "";
    if (twoDigitHours.length == 1) {
        twoDigitHours = "0" + twoDigitHours;
    }
    var twoDigitMinutes = "59";

    var twoDigitSeconds = "59";

    var threeDigitMillis = "999";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}

function getbeginOfDay(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = "00";

    var twoDigitMinutes = "00";

    var twoDigitSeconds = "00";

    var threeDigitMillis = "000";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}

function getendOfDay(date) {

    var fullDate = date;

    var twoDigitMonth = fullDate.getMonth() + 1;
    twoDigitMonth + "";
    if (twoDigitMonth.length == 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDate = fullDate.getDate();
    twoDigitDate + "";
    if (twoDigitDate.length == 1) {
        twoDigitDate = "0" + twoDigitDate;
    }
    var twoDigitHours = "23";

    var twoDigitMinutes = "59";

    var twoDigitSeconds = "59";

    var threeDigitMillis = "999";

    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
    return currentDate;
}