var myChart3;
var data3 = [];


var value3 = Math.random() * 1000;

function initGraph1(begin, end) {

    myChart3 = echarts.init(document.getElementById('main'));

    option3 = {
        grid: {
            top: 10,
            bottom: 40,
        },
        title: {
            show: false,
            text: "#Abgearbeitet / min",
            left: 500,
            top: 0

        },
        /*
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
        */
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            axisLabel: {
                margin: -2,
                //interval: 2,
                rotate: 0
            },

        },
        yAxis: {
            type: 'value',

            boundaryGap: [0, '100%'],

            splitLine: {
                show: false
            },
        },
        series: [{
            name: 'aaa',
            type: 'bar',
            showSymbol: false,
            hoverAnimation: false,
            data: data3,
            itemStyle: {
                color: '#0D1A46'
            }
        }]
    };
    myChart3.setOption(option3, true);
}

var minutes;

/*
function setInterval2(begin, end) {
    begin = 0;
    end = 12;

    data3 = [];
    myChart3.setOption({

        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            min: begin,
            max: end,
            data: [0,2,4,8,12]
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
*/

function drawGraph1(dataArray) {

    dataArray1 = [];
    dataArray2 = [];

    for(var i = 0; i < dataArray.length; ++i){
        dataArray1[i] = dataArray[i].value[1];
        dataArray2[i] = dataArray[i].value[0];
    }

    myChart3.setOption({
        xAxis: {
            data: dataArray2
        },
        series: [{
            data: dataArray1 //messageDataContainer.getDay(date).messagesPerHour
        }]
    });
};

function cutLeadingZeros(array) {
    for (var i = array.length - 1; i >= 0; --i) {

        if (array[i].value[1] === 0) {
            array.splice(i, 1);
        } else {
            return array;
        }
    }
    return array;
}


