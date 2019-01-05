var myChart_3;


// point information //
var radius3;
var radiusInPercentage3;

var _x3 ;
var _y3;

var cx3;
var cy3;
var pointRadius3;
var value3;
var thickness3;

var globalOption3;
// point information end//
function initVariables3(){

    thickness3 = 8;
    radius3 = 0.9;
    radiusInPercentage3 = (radius3 * 100) + "%";

    _x3 = $('#main_1')[0].offsetWidth;
    _y3 = $('#main_1')[0].offsetHeight;

    cx3 = _x3 / 2  ;
    cy3 = _y3 * 0.5;
    pointRadius3 = _x3 > _y3 ? _y3 * 0.5 * radius3 - (thickness3 / 2) : _x3 * 0.5 * radius3 - (thickness3 / 2);
    value3 = 0;
}

function initGraph3() {

    myChart_3 = echarts.init(document.getElementById('main_1'));

    option3 = {

        title: {
            show:false,
            text: "#Neu"
        },

        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
            {
                name: 'Abgearbeitet',
                type: 'gauge',
                //detail: {formatter: '{value}%'},
                center: ["50%", "50%"],
                startAngle: 270,
                endAngle: -89.9999,
                radius: radiusInPercentage3,
                data: [{value: 0}],
                min: 0,
                max: 5,
                axisLabel: {
                show: false,
                    textStyle: {

                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff',
                        shadowBlur: 10

                    }
                },
                axisLine: {
                    lineStyle: {
                        color: [[0, '#1FA8DD'],[1, '#0D1A46']],
                        width: thickness3,
                        shadowColor : '#fff',
                        shadowBlur: 10
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false,
                },
                pointer: {
                    show:false
                },
                title : {
                    show: false
                },

                detail : {
                    formatter: function(counterVariable){

                        if(Math.abs(counterVariable).toString().length > 3){

                            if(Math.abs(counterVariable).toString().length < 7){
                                counterVariable = counterVariable / (1e3);
                                counterVariable = counterVariable.toString().substring(0,4);
                                counterVariable += " Tsd";
                            } else if (Math.abs(counterVariable).toString().length < 10){
                                counterVariable = counterVariable / (1e6);
                                counterVariable = counterVariable.toString().substring(0,4);
                                counterVariable += " Mio";
                            } else if (Math.abs(counterVariable).toString().length < 13){
                                counterVariable = counterVariable / (1e9);
                                counterVariable = counterVariable.toString().substring(0,4);
                                counterVariable += " Mia";
                            } else if (Math.abs(counterVariable).toString().length < 16){
                                counterVariable = counterVariable / (1e12);
                                counterVariable = counterVariable.toString().substring(0,4);
                                counterVariable += " Bio";
                            } else if (Math.abs(counterVariable).toString().length < 19){
                                counterVariable = counterVariable / (1e15);
                                counterVariable = counterVariable.toString().substring(0,4);
                                counterVariable += " Bia";
                            }
                        }
                        return counterVariable;
                    },
                    color: '#0D1A46',
                    offsetCenter: [0,0]
                },

            }
        ]
        /*
        ,
        graphic: [{
            type: 'circle',
            shape: {
                r: 10,
                cx: cx3 + pointRadius3 * 0,//Math.cos(Math.PI * (0 / 110)),
                cy: cy3 - pointRadius3 * (-1)//Math.sin(Math.PI * (0 / 110))
            },
            style: {

                fill: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(230, 230, 255)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }]),

                //fill: '#1FA8DD',
                stroke: '#1FA8DD',
                lineWidth: 0
            },
            z: 3
        }]*/
    };

    globalOption3 = option3;
    myChart_3.setOption(option3, true);

}

function updateGauge3(counterVariable) {
    var maxValue;
    if(counterVariable <= 10){
        maxValue = 10;
    } else if(counterVariable <= 100){
        maxValue = 100;
    } else if(counterVariable <= 1000){
        maxValue = 1000;
    } else if(counterVariable <= 10000){
        maxValue = 10000;
    }

    var angleX = Math.sin(Math.PI * (counterVariable / maxValue * 2));
    var angleY = Math.cos(Math.PI * (counterVariable / maxValue * 2))*(-1);

    globalOption3.series[0].data[0].value = counterVariable; //(Math.random() * 100).toFixed(2) - 0;
    globalOption3.series[0].axisLine.lineStyle.color = [[counterVariable / maxValue, '#1FA8DD'],[1, '#0D1A46']];
    //globalOption3.graphic[0].shape.cx = cx3 - pointRadius3 * angleX;
    //globalOption3.graphic[0].shape.cy = cy3 - pointRadius3 * angleY;

    myChart_3.setOption(globalOption3, true);
};