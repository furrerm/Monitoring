var conn;
var filterProperties = new FilterProperties("0", [""], [""], [""]);
var messageDataContainer;
function inform(){
    //console.log("filter change = "+filterProperties);
}


var messageHandler = new MessageHandler(new FilterProperties(TimeOfInterest.DAY, [""], [0], [""]));
async function asyncReaderFunc(msg) {
    var reader = new FileReader();
    reader.onload = function () {

        console.log(reader.result);
        let obj = JSON.parse(reader.result);
        console.log(obj);
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

            console.log("time for performanceanalysis = "+new Date().getTime());

        }
        else {
            let messageCounter = obj.length;
            console.log(obj);
            console.log(obj.length);
            for (let i = 0; i < messageCounter; ++i) {
                console.log(obj[i]);

                $("#korbMultiSelector").append("<option class='update' value="+obj[i].id+">" + obj[i].korbName + "</option>");
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


        try {
            let cValue = 3;// document.getElementById("out").value;
            //@todo try catch einbauen

            if (isJson(msg.data)) {
                console.log(msg.data);

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