var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
di = 1;

function Circle(x, y, dx, dy, r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.strokeStyle = "blue";
        c.stroke();
    }
}

function Rectangle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.stroke();
    }
}

function draw(){
    i+=di;

    var circle = new Circle(20, 20, 0, 0, 20);
    circle.draw();
    var rect = new Rectangle(100, 100, 20, 40);
    rect.draw();
}