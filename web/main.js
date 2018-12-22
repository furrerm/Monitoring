var conn;
var filterProperties = new FilterProperties("2", ["korb1"], ["gui1"]);
var messageDataContainer;
var counterblatoclear = 0;

var messageHandler = new MessageHandler(new FilterProperties(TimeOfInterest.DAY, ["Korb0", "Korb1", "Korb2", "Korb3", "Korb4", "Korb5", "Korb6", "Korb7"], [0, 1, 2, 3, 4, 5]))
async function asyncReaderFunc(msg) {
    var reader = new FileReader();
    reader.onload = function () {


        let obj = JSON.parse(reader.result);

        if (isNaN(obj.length)) {
            var message = new Message(obj);

            console.log(obj);
            console.log(obj.length);
            messageHandler.save(message);
            updateGauge3(messageHandler.getGauge1());

            updateGauge4(messageHandler.getGauge2());
            updateGauge6(messageHandler.getGauge3());

            drawGraph1(messageHandler.getLineChartArray());
            setDataValue5(messageHandler.getBubbleChartArray());

        }
        else {
            let messageCounter = obj.length;
            console.log(obj);
            console.log(obj.length);
            for (let i = 0; i < messageCounter; ++i) {
                var message = new Message(obj[i]);

                messageDataContainer.addSingleMessage(message);

                drawGraph1(messageDataContainer);

                setDataValue5(messageDataContainer);

                updateGauge3(messageDataContainer.gaugeChart1Data);
                updateGauge6(messageDataContainer.gaugeChart2Data);
                updateGauge4(messageDataContainer.gaugeChart3Data);
            }
        }
    }
    reader.readAsText(msg);
}

async function connect() {


    messageDataContainer = new MessageData();
    conn = new WebSocket("ws://localhost:8384/messageBean1/echo");
    conn.onmessage = (msg) => {


        asyncReaderFunc(msg.data);


        //asyncReaderFunc(msg.data);
        try {
            let cValue = 3;// document.getElementById("out").value;
            //@todo try catch einbauen

            if (isJson(msg.data)) {
                console.log(msg.data);
                /*
                                let obj = JSON.parse(msg.data);

                                var message = new Message(obj);

                                messageDataContainer.addSingleMessage(message);

                                drawGraph1(messageDataContainer);

                                setDataValue5(messageDataContainer);

                                updateGauge3(messageDataContainer.gaugeChart1Data);
                                updateGauge6(messageDataContainer.gaugeChart2Data);
                                updateGauge4(messageDataContainer.gaugeChart3Data);
                */

            }
        }
        catch (err) {
            console.log(err.message);
            console.log(msg.data);
        }

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