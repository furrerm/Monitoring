var myChart_6;
// point information //
var radius6;
var radiusInPercentage6;

var _x6 ;
var _y6;

var cx6;
var cy6;
var pointRadius6;
var value6;
var thickness6;

var globalOption6;

// point information end//
function initVariables6(){

    thickness6 = 8;
    radius6 = 0.9;
    radiusInPercentage6 = (radius6 * 100) + "%";

    _x6 = $('#main_6')[0].offsetWidth;
    _y6 = $('#main_6')[0].offsetHeight;

    cx6 = _x6 / 2  ;
    cy6 = _y6 * 0.5;
    pointRadius6 = _x6 > _y6 ? _y6 * 0.5 * radius6 - (thickness6 / 2) : _x6 * 0.5 * radius6 - (thickness6 / 2);
    value6 = 0;
}

function initGraph6() {

    myChart_6 = echarts.init(document.getElementById('main_6'));

    option6 = {
        title: {

            text: "#Aktuell im Korb",
            show: false
        },
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
            {
                name: 'Abgearbeitet6',
                type: 'gauge',
                //detail: {formatter: '{value}%'},
                center: ["50%", "50%"],
                startAngle: 270,
                endAngle: -89.9999,
                radius: radiusInPercentage6,
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
                        width: thickness6,
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
                    color: '#0D1A46',
                },

            }
        ],
        /*
        graphic: [{
            type: 'circle',
            shape: {
                r: 10,
                cx: cx6 + pointRadius6 * 0,//Math.cos(Math.PI * (0 / 110)),
                cy: cy6 - pointRadius6 * (-1)//Math.sin(Math.PI * (0 / 110))
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

    globalOption6 = option6;


    myChart_6.setOption(option6, true);




}

function updateGauge6(counterVariable) {




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


    globalOption6.series[0].data[0].value = counterVariable; //(Math.random() * 100).toFixed(2) - 0;
    globalOption6.series[0].axisLine.lineStyle.color = [[counterVariable / maxValue, '#1FA8DD'],[1, '#0D1A46']];

    //globalOption6.graphic[0].shape.cx = cx6 - pointRadius6 * angleX ;
    //globalOption6.graphic[0].shape.cy = cy6 - pointRadius6 * angleY;

    myChart_6.setOption(globalOption6, true);




};