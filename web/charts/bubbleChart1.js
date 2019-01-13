var myChart5;
var data5 = [];
data5 = [
    [[0, 0, 0, '', 1990, 0], [1, 0, 0, '', 1990, 1], [2, 0, 0, '', 1990, 2], [3, 0, 0, '', 1990, 3], [4, 0, 0, '', 1990, 4], [5, 0, 0, '', 1990, 5], [6, 0, 0, '', 1990, 6], [7, 0, 0, '', 1990, 7], [8, 0, 0, '', 1990, 8], [9, 0, 0, '', 1990, 9], [10, 0, 0, '', 1990, 10], [11, 0, 0, '', 1990, 11]],

];
var xData = ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '];

function initGraph5() {

    myChart5 = echarts.init(document.getElementById('main5'));


    option5 = {

        tooltip: {
            show: false
        },
        title: {
            //text: '#Abgearbeitet'
        },
        legend: {
            right: 10
            //data: ['#Abgearbeitet']
        },
        xAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: xData
        },
        yAxis: {

            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            show: false,
            min: -50,
            max: 50,
            scale: true
        },

        series: [{
            /*name: '#Abgearbeitet',*/
            data: data5[0],
            type: 'scatter',
            symbolSize: function (data) {
                return data[2] * 15;
                //return Math.sqrt(data[2]) / 5e2;

            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }
        }]
    };
    myChart5.setOption(option5, true);

}

function getDiff(hour) {
    return Math.floor(hour);

}

var change = 0;
var temp = 0;
var minuend = 0;

function setDataValue5(messageDataArray) {

    const maxSymbolHeight = $("#main5").height();
    const maxSymbolWidth = $("#main5").width() * 0.9 / messageDataArray[0].length;
    const biggestValue = messageDataArray[2];

        myChart5.setOption({
        grid: {
            left: '5%',
            right: '5%'
        },
        xAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: messageDataArray[1]
        },
        series: [{
            //name: '#Abgearbeitet',
            data: messageDataArray[0],
            type: 'scatter',
            symbolSize: function (data, width) {
                //return data[2] * 15 * 12 / messageDataContainer.biggestValueInBubbleChart;
                return maxSymbolHeight < maxSymbolWidth ? Math.sqrt(data[2]/biggestValue)*maxSymbolHeight : Math.sqrt(data[2]/biggestValue)*maxSymbolWidth;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return messageDataArray[3];
                    },
                    position: 'top'
                }
            },
            label:{
                show: true,
                formatter: function (param) {
                    return param.data[2];
                },
            },
            hoverAnimation:false,
            itemStyle: {
                normal: {
                    color:'#0D1A46'
                }
            }
        }]
    })
};

function getSymbolArray(array){
    var arr = [];
    for(var i = 0; i < array.length; ++i){
        arr.push(array[i][1]);
    }
    return arr;
}