var myChart3;
var data3 = [];
var now3 = +new Date(1997, 9, 3);
var oneDay3 = 24 * 3600 * 1000;
var value3 = Math.random() * 1000;

function initGraph1(begin, end) {

    myChart3 = echarts.init(document.getElementById('main'));

    option3 = {
        title: {
            show: false,
            text: "#Abgearbeitet / min",
            left: 500,
            top: 0

        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);

                return [date.getFullYear(), date.getMonth(), date.getDate()].join('/') + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds() + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            min: begin,
            max: end
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
            //min: 0,
            //max: 10
        },
        series: [{
            name: 'aaa',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data3,
            lineStyle: {
                color: '#0D1A46'
            }
        }]
    };

    myChart3.setOption(option3, true);

}

var minutes;

function randomData2() {
    now3 = new Date(+now3 + oneDay3);
    //value3 = value3 + Math.random() * 21 - 10;
    //console.log([now3.getFullYear(), now3.getMonth(), now3.getDate()].join('-') + " " + now3.getHours() + ":" + now3.getMinutes());
    minutes = now3.getMinutes();
    if (minutes.toString().length == 1) {
        minutes = "0" + now3.getMinutes();
    }
    return {
        name: now3.toString(),
        value: [
            [now3.getFullYear(), now3.getMonth(), now3.getDate()].join('-') + " " + now3.getHours() + ":" + minutes + ":" + now3.getSeconds() + "." + now3.getMilliseconds(),
            //'2009/6/12 2:00', '2009/6/12 2:05:08', '2009/6/12 2:05:08.123'
            Math.round(value3)
        ]
    }
};



function setInterval2(begin, end) {

    data3 = [];
    myChart3.setOption({

        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            min: begin,
            max: end
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            data: data3
        }]
    })
};


function drawGraph1(messageDataContainer) {


console.log("line chart =");
console.log(messageDataContainer.lineChart1Data);

    myChart3.setOption({
        series: [{
            data: cutLeadingZeros(messageDataContainer.lineChart1Data.slice()) //messageDataContainer.getDay(date).messagesPerHour
        }]
    });
};

function cutLeadingZeros(array){
    for(var i = array.length - 1; i >= 0; --i){

        if(array[i].value[1] === 0){
            array.splice(i,1);
        } else{
            return array;
        }
    }
    return array;
}


