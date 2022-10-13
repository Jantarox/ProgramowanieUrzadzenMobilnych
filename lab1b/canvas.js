var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
di = 1;

var color1 = "green";
var color2 = 'rgba(255,0,0,0)';

function draw(){
    i+=di;

    //Circle1
    c.beginPath();
    c.arc(100, 100, 50, 0, 2 * Math.PI);
    if(i==100){
        if(color1 === "green"){
            color1 = "blue";
        }else{
            color1 = "green";
        }
        di = -di;
    }
    if(i==0){
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
    c.arc(500, 100, 50, 0, 2 * Math.PI);
    color2 = `rgba(0,${255-colorGradient},${colorGradient},1)`;
    c.closePath();
    c.fillStyle = color2;
    c.fill();
    c.stroke();
    
}