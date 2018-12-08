var conn;
var filterProperties = new FilterProperties("2", ["korb1"], ["gui1"]);
var messageDataContainer;
function connect() {



    messageDataContainer = new MessageData();
    conn = new WebSocket("ws://localhost:8384/messageBean1/echo");
    conn.onmessage = (msg) => {


        try {
            let cValue = 3;// document.getElementById("out").value;
            //@todo try catch einbauen
            if (isJson(msg.data)) {
                console.log(msg.data);

                let obj = JSON.parse(msg.data);

                var message = new Message(obj);

                messageDataContainer.addSingleMessage(message);

                drawGraph1(messageDataContainer);

                setDataValue5(messageDataContainer);

                updateGauge3(messageDataContainer.gaugeChart1Data);
                updateGauge6(messageDataContainer.gaugeChart2Data);
                updateGauge4(messageDataContainer.gaugeChart3Data);


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