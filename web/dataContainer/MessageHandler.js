class MessageHandler {

    constructor(properties) {
        this.dataContainer = new DataContainer(properties);
    }

    save(message) {
            this.dataContainer.save(message);
    }
    getGauge1(){
        if(typeof this.dataContainer.incoming !== 'undefined' && this.dataContainer.incoming.counter !== 'undefined'){
            return this.dataContainer.incoming.counter;
        }
        return 0;
    }
    getGauge2(){
        if(typeof this.dataContainer.outgoing !== 'undefined' && this.dataContainer.outgoing.counter !== 'undefined'){
            return this.dataContainer.outgoing.counter;
        }
        return 0;
    }
    getGauge3(){
        if(typeof this.dataContainer.korbstaende !== 'undefined'){
            return this.dataContainer.korbstaende;
        }
        return 0;
    }
    getLineChartArray(){
        if(typeof this.dataContainer.outgoing !== 'undefined' && this.dataContainer.outgoing.timeBasedContainers !== 'undefined') {
            var containers = this.dataContainer.outgoing.timeBasedContainers;
            var lineChartArray = [];

            for (var i = 0; i < containers.length; ++i) {
                lineChartArray.push({
                    value: [
                        containers[i].label,
                        containers[i].counter
                    ]
                });
            }
            return lineChartArray;
        }
        return {
            value: [
                0,
                0
            ]
        };
    }
    getBubbleChartArray(){
        var bubbleChart1Data = [
            [],
        ];

        var bubbleChartXAxe = [];
        var containersRefinedForBubbleArray = [];
        var maxValue;
        if(typeof this.dataContainer.outgoing !== 'undefined' && this.dataContainer.outgoing.timeBasedContainers !== 'undefined') {
            var containers = this.dataContainer.outgoing.timeBasedContainers;
            containersRefinedForBubbleArray = this.cutLeadingZerosUntilLengthOfTwelve(containers);
            for (var i = 0; i < containersRefinedForBubbleArray.length; ++i) {
                bubbleChart1Data[0].push([i, 0, 0, '', 0, 0, new Date(2000, 0, 0, 0, 0, 0, 0)]);
                bubbleChartXAxe.push(containersRefinedForBubbleArray[i].label);
                //bubbleChart1Data[0][i][1] = containersRefinedForBubbleArray[i].counter;
                bubbleChart1Data[0][i][2] = containersRefinedForBubbleArray[i].counter;
                bubbleChart1Data[0][i][3] = bubbleChart1Data[0][i][1].toString();
            }
        }
        maxValue = this.getMaxCounterInTimeBasedContainers(containersRefinedForBubbleArray);
        bubbleChart1Data.push(bubbleChartXAxe);
        bubbleChart1Data.push(maxValue);

        console.log(bubbleChart1Data[0]);
        if(typeof bubbleChart1Data[0] === 'undefined'){
            bubbleChart1Data[0].push([0, 0, 0, '', 0, 0, new Date(2000, 0, 0, 0, 0, 0, 0)]);
            bubbleChartXAxe.push(containersRefinedForBubbleArray[i].label);
        }

        return bubbleChart1Data;
    }
    cutLeadingZerosUntilLengthOfTwelve(arrayToCut){
        var cuttedArray = arrayToCut.slice();
        for(var i = cuttedArray.length - 1;  i >= 12; --i){
            if(cuttedArray[i].counter === 0){
                cuttedArray.splice(-1);
            } else{
                break;
            }
        }
        if(cuttedArray.length > 12){
            cuttedArray.splice(0, cuttedArray.length - 12);
        }
        return cuttedArray
    }
    getMaxCounterInTimeBasedContainers(timeBasedContainers){
        var maxValue = 0;
        for(var i = 0; i < timeBasedContainers.length; ++i){
            if(timeBasedContainers[i].counter > maxValue){
                maxValue = timeBasedContainers[i].counter;
            }
        }
        return maxValue;
    }
}