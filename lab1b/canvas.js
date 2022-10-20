var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
di = 1;

var color1 = "green";
var color2 = 'rgba(255,0,0,0)';

var y = 100;
var dy = 4;
var a = 0.2;

function draw(){
    i+=di;

    //Circle1
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.arc(100, 100, 50, 0, 2 * Math.PI);
    if(i > 50){
        color1 = "blue";
    }else{
        color1 = "green";
    }
    if(i==0 || i==100){
        di = -di;
    }
    c.closePath();
    c.fillStyle = color1;
    c.fill();
    c.closePath();
    c.stroke();

    //Circle2
    c.beginPath();
    colorGradient = i*255/100;
    c.arc(300, 100, 50, 0, 2 * Math.PI);
    color2 = `rgba(0,${255-colorGradient},${colorGradient},1)`;
    c.closePath();
    c.fillStyle = color2;
    c.fill();
    c.stroke();

    //Circle3
    c.beginPath();
    colorGradient = i*255/100;
    c.arc(500, y, 50, 0, 2 * Math.PI);
    color2 = `rgba(0,${255-colorGradient},${colorGradient},1)`;
    c.closePath();
    c.fillStyle = color2;
    c.fill();
    c.stroke();

    
    if(y > 600 - 50 || y < 0 + 50){
        dy = -dy - a;
        console.log(dy)
    }
    dy+=a;
    y+=dy;
    console.log();
}