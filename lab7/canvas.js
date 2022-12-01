var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;
var g = 0.2;

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if(key === "ArrowLeft"){
        car.moveLeft();
    }else if(key === "ArrowRight"){
        car.moveRight();
    }
})

function Circle(x, y, dx, dy, r) {
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

    this.update = function () {
        this.dy += g;
        //Colision with boundaries
        if (this.x > canvas.width - this.r || this.x < this.r) {
            this.dx *= -1;
        }
        if (this.y > canvas.height - this.r || this.y < this.r) {
            this.dy *= -1;
            this.dy *= 0.8;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function Rectangle(x, y, width, height, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.stroke();
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function Roadline(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "white";
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, 100, 20);
        c.strokeStyle = "red";
        c.fillStyle = "red";
        c.fillRect(this.x+50, this.y, 50, 20);
        c.stroke();
    }

    this.update = function(){
        this.x += this.dx;
        this.draw()
    }
}

function Car(x, y, dy, color){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fillRect(this.x-40, this.y, 80, 150);
        c.strokeStyle = "black";
        c.fillStyle = "white";
        c.arc(this.x-30, this.y+30, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(this.x-30, this.y+120, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(this.x+30, this.y+30, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(this.x+30, this.y+120, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
    }

    this.moveLeft = function(){
        if(this.x - 5 >= 260){
            this.x -= 5;
        }
    }

    this.moveRight = function(){
        if(this.x + 5 <= 550){
            this.x += 5;
        }
    }

    this.update = function(){
        this.y += this.dy;
        this.draw()
    }
}

roadSpeed=2;

var car = new Car(400, 400, 0, "red");

var obstacles = [];

var roadLines = [];
for(var i = -1; i < 8; i++){
    roadLines.push(new Roadline(i*100, 500, roadSpeed));
}
var circle;

function draw() {
    i += di;
    c.fillStyle = "blue";
    c.fillRect(0, 0, canvas.width, canvas.height);


    roadLines.forEach((line) => {
        if(line.x >= canvas.width){
            line.x -= canvas.width + 100;
        }
        line.update();
    });
    obstacles = obstacles.filter(obstacle => obstacle.y < 600);
    if(obstacles.length == 0){
        if(Math.random() > 0.5){
            obstacles.push(new Car(300, -150, 2, "green"));
        }else{
            obstacles.push(new Car(500, -150, 2, "green"));
        }
        
    }
    obstacles.forEach((obstacle) => {
        obstacle.update();
    });
    car.update();
}