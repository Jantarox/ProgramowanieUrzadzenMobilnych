var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 1000);

var color = "green";


function draw(){
    c.beginPath();
    c.arc(400, 300, 200, 0, 2 * Math.PI);
    
    
    if(color === "green"){
        color = "blue";
    }else{
        color = "green";
    }
       
    c.fillStyle = color;
    c.fill();
    c.stroke();
}