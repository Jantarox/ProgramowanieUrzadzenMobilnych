var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;

var color = "green";

function draw(){
    c.beginPath();
    c.arc(100, 100, 50, 0, 2 * Math.PI);
    
    if(i==100){
        if(color === "green"){
            color = "blue";
        }else{
            color = "green";
        }
        i=0;
    }
    

    c.fillStyle = color;
    c.fill();
    c.stroke();

    i++;
}