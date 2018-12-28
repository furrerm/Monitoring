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

var filterDataMessage;
$(document).ready(function () {

    $('#toggle').click(function() {
        if(!$('#toggle').is(':checked')) {
            updateProperties();
            sendMessage(filterDataMessage);
        }
    });
});
function updateProperties(){

    var koerbe = $("#korbMultiSelector").val();
    var timeOfInterestId = parseInt($(".zeitspanne:checked").val(), 10);
    var guis = [];
    $(".guicheckboxes:checkbox:checked").each(function () {
        guis.push(parseInt($(this).val()));
    });

    var timeOfInterest;
    for (const entry in TimeOfInterest) {
        if(TimeOfInterest[entry].ID === timeOfInterestId){
            timeOfInterest = TimeOfInterest[entry];
        }
    }

    filterProperties = new FilterProperties(timeOfInterest, koerbe, guis);
    messageHandler = new MessageHandler(filterProperties);

    //update front end
    //guis
    $(".pointForGuiAnzeige").css("background-color", "lightgray");
    for(var i = 0; i < guis.length; ++i){

        var str = "gui"+guis[i];
        $("#"+str).css("background-color", "#00a7e0");
    }
    $("#guiLabel").html(guis.length);

    
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
    $.cookie("zeitspanne", JSON.stringify(timeOfInterestId));

    //create Message
    filterDataMessage = {};
    filterDataMessage.guis = guis;
    filterDataMessage.koerbe = koerbe;

    var period = DateHelper.getStartInMillisFromEnum(timeOfInterest,new Date());
    filterDataMessage.timeOfInterest = period.von;
    filterDataMessage.timeOfInterestEnd = period.bis;

    filterDataMessage.subTimeList = DateHelper.getSubTimeRangesInMillis(timeOfInterest,new Date());
    filterDataMessage = JSON.stringify(filterDataMessage).replace(/\s/g, '');

    console.log(filterDataMessage);
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