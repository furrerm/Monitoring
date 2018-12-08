
var arrayTest = [];
for(var i = 0; i < 10; ++i){
    arrayTest.push(new Date(2000,10, Math.round(Math.random()*32)));
}
console.log(arrayTest);

arrayTest.sort(function(a,b){
    return a -b
;});
console.log(arrayTest);



console.log(6e4*120);