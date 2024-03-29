var myChart_4;


// point information //
var radius4;
var radiusInPercentage4;

var _x4 ;
var _y4;

var cx4;
var cy4;
var pointRadius4;
var value4;
var thickness4;

var globalOption4;
// point information end//
function initVariables4(){

    thickness4 = 8;
    radius4 = 0.9;
    radiusInPercentage4 = (radius4 * 100) + "%";

    _x4 = $('#main_4')[0].offsetWidth;
    _y4 = $('#main_4')[0].offsetHeight;

    cx4 = _x4 / 2  ;
    cy4 = _y4 * 0.5;
    pointRadius4 = _x4 > _y4 ? _y4 * 0.5 * radius4 - (thickness4 / 2) : _x4 * 0.5 * radius4 - (thickness4 / 2);
    value4 = 0;
}

function initGraph4() {

    myChart_4 = echarts.init(document.getElementById('main_4'));

    option4 = {
        title: {
            show:false,
            text: "#Abgearbeitet",
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize:13
            }
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
                radius: radiusInPercentage4,
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
                        width: thickness4,
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
        ],
        /*
        graphic: [{
            type: 'circle',
            shape: {
                r: 10,
                cx: cx4 + pointRadius4 * 0,//Math.cos(Math.PI * (0 / 110)),
                cy: cy4 - pointRadius4 * (-1)//Math.sin(Math.PI * (0 / 110))
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
        }]
        */
    };

    globalOption4 = option4;

    myChart_4.setOption(option4, true);
}

function updateGauge4(counterVariable) {

    var exponent = counterVariable.toString().length;
    var maxValue = Math.pow(10, exponent);


    var angleX = Math.sin(Math.PI * (counterVariable / maxValue * 2));
    var angleY = Math.cos(Math.PI * (counterVariable / maxValue * 2))*(-1);

    globalOption4.series[0].data[0].value = counterVariable;
    globalOption4.series[0].axisLine.lineStyle.color = [[counterVariable / maxValue, '#1FA8DD'],[1, '#0D1A46']];

    myChart_4.setOption(globalOption4, true);
};