var conn;
var filterProperties = new FilterProperties("0", [""], [""], [""]);
var messageDataContainer;

var messageHandler = new MessageHandler(new FilterProperties(TimeOfInterest.DAY, [""], [0], [""]));

async function asyncReaderFunc(msg) {
    var reader = new FileReader();
    reader.onload = function () {

        let obj = JSON.parse(reader.result);
        if (isNaN(obj.length)) {

            var message = new Message(obj);

            messageHandler.save(message);
            updateGauge3(messageHandler.getGauge1());

            updateGauge4(messageHandler.getGauge2());
            updateGauge6(messageHandler.getGauge3());

            drawGraph1(messageHandler.getLineChartArray());
            setDataValue5(messageHandler.getBubbleChartArray());
        }
        else {
            let messageCounter = obj.length;

            for (let i = 0; i < messageCounter; ++i) {

                $("#korbMultiSelector").append("<option class='update' value=" + obj[i].id + ">" + obj[i].korbName + "</option>");
            }
            setProperties();

            updateProperties();

            sendMessage(filterDataMessage);
        }
    }
    reader.readAsText(msg);
}

async function connect() {


    conn = new WebSocket("ws://localhost:8384/messageBean1/echo");
    conn.onmessage = (msg) => {
        asyncReaderFunc(msg.data);

    }

}

function sendMessage(jsonMessage) {
    conn.send(jsonMessage);
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}