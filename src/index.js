import trafficLight from './trafficLight';
import inputTally from './inputTally';



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button_b')
    .addEventListener('click', (e)=>{onclick(1)});
    document.getElementById('button_y')
    .addEventListener('click', (e)=>{onclick(2)});
    document.getElementById('button_r')
    .addEventListener('click', (e)=>{onclick(3)});

    document.getElementById('tally').addEventListener("change",(e)=>{
        document.getElementById('result').value = e.detail.newValue;
    });

});

function onclick(target){
    document.getElementById('traffic_light1').setAttribute("target",target)
    document.getElementById('traffic_light2').setAttribute("target",target)
    document.getElementById('traffic_light3').setAttribute("target",target)
}