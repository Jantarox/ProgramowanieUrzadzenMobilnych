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

    if(key === " "){
        car.jump();
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

function Car(x, y, dx, dy, color, id) {
    this.x = x;
    this.y = y;

    this.w = 150;
    this.h = 60;

    this.dx = dx;
    this.dy = dy;

    this.id = id;

    this.jumping = false;

    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, 150, 60);
        c.strokeStyle = "black";
        c.fillStyle = "white";
        c.arc(this.x+30, this.y+60, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(this.x+120, this.y+60, 20, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
    }

    this.jump = function(){
        if(!this.jumping){
            this.jumping = true;
            this.dy = -10;
        }
    }

    this.update = function(){
        if(this.jumping){
            this.dy += g;
        }

        this.y += this.dy;
        this.x += this.dx;
        this.draw()
    }
}

function checkCarColision(car1, car2) {

    if (
        car1.x < car2.x + car2.w &&
        car1.x + car1.w > car2.x &&
        car1.y < car2.y + car2.h &&
        car1.h + car1.y > car2.y
    ) {
        return true;
    }
    return false;
}

roadSpeed= -2;

var car = new Car(100, 500, 0, 0, "red", 0);

var obstacles = [];

var gameInProgress = true;
c.font = "30px Arial";

var roadLines = [];
for(var j = -1; j < 8; j++){
    roadLines.push(new Roadline(j*100, 580, roadSpeed));
}
var circle;

function draw() {
    i += di;
    c.fillStyle = "cyan";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "green";
    c.fillRect(0, canvas.height-200, canvas.width, 200);


    roadLines.forEach((line) => {
        if(line.x <= -100){
            line.x += canvas.width + 100;
        }
        line.update();
    });
    obstacles = obstacles.filter(obstacle => obstacle.x > -200);
    if(obstacles.length == 0){
        obstacles.push(new Car(800, 500, -2, 0, "blue", i));
    }
    obstacles.forEach((obstacle) => {
        obstacle.update();
        if(checkCarColision(car, obstacle)){
            gameInProgress = false;
        }
    });

    if(!gameInProgress){
        c.fillStyle = "red";
        c.fillText(`Game over!`, canvas.width/2-80, canvas.height/2);
    }

    car.update();
}