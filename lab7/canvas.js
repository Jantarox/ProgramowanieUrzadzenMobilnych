var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;
var g = 0.04;

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if(key === " "){
        car.jump();
    }
})

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

function Car(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;

    this.w = 150;
    this.h = 60;

    this.dx = dx;
    this.dy = dy;

    this.jumping = false;
    this.scored = false;

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
            this.dy = -4;
        }
    }

    this.update = function(){
        if(this.jumping){
            this.dy += g;
        }

        this.y += this.dy;
        this.x += this.dx;

        if(this.y > 500){
            this.y = 500;
            this.jumping = false;
        }

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

var roadSpeed = -2;
var points = 0;
var gameInProgress = true;
c.font = "30px Arial";

var car = new Car(100, 500, 0, 0, "red");
var obstacles = [];

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
        obstacles.push(new Car(800, 500, -2, 0, "blue"));
    }
    obstacles.forEach((obstacle) => {
        obstacle.update();
        if(checkCarColision(car, obstacle)){
            gameInProgress = false;
        }
        if(gameInProgress && obstacle.x < 100 - obstacle.w && !obstacle.scored){
            points++;
            obstacle.scored = true;
        }
    });

    c.fillStyle = "black";
    c.fillText(`Points: ${points}`, 10, 30);  

    if(!gameInProgress){
        c.fillStyle = "red";
        c.fillText(`Game over!`, canvas.width/2-80, canvas.height/2);
    }

    car.update();
}