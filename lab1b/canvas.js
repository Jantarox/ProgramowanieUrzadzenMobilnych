var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 1000);


function draw(){
    var now = new Date();
    
    
    var second = now.getSeconds();
    c.beginPath();
    c.arc(400, 300, 200, 0, 2 * Math.PI);
    
    var color = "green";
    if(second%2){
        color = "blue";
    }
       
    c.fillStyle = color;
    c.fill();
    c.stroke();
}