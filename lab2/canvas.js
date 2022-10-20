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

    this.update = function(){
        if (this.x > canvas.width - this.r || this.x < this.r) {
            this.dx *= -1;
        }
        if (this.y > canvas.height - this.r || this.y < this.r) {
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy

        this.draw();
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

var rects = [];
function drawRects(){
    rects.forEach(rect => rect.draw())
}

var circle = new Circle(20, 20, 10, 0, 20);

function draw(){
    i+=di;
    c.clearRect(0, 0, innerWidth, innerHeight);

    


    

    rects.push(new Rectangle(700, 100, 100, 100))
    rects.push(new Rectangle(600, 200, 200, 100))
    rects.push(new Rectangle(500, 300, 300, 100))
    rects.push(new Rectangle(400, 400, 400, 100))
    rects.push(new Rectangle(300, 500, 500, 100))
    circle.update();
    drawRects();
}