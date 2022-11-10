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
        car.startMovingLeft();
    }else if(key === "ArrowRight"){
        car.startMovingRight();
    }
})

document.addEventListener('keyup', (event) => {
    const key = event.key;

    if(key === "ArrowLeft" || key === "ArrowRight"){
        car.stopMoving();
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

function Roadline(x, y, dy){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = "black";
        c.fillRect(this.x, this.y, 400, 150);
        c.strokeStyle = "white";
        c.fillStyle = "white";
        c.fillRect(this.x+175, this.y, 50, 75);
        c.fillRect(this.x, this.y, 20, 37);
        c.fillRect(this.x+380, this.y, 20, 37);
        c.fillRect(this.x, this.y+75, 20, 37);
        c.fillRect(this.x+380, this.y+75, 20, 37);
        c.strokeStyle = "red";
        c.fillStyle = "red";
        c.fillRect(this.x, this.y+37, 20, 38);
        c.fillRect(this.x+380, this.y+37, 20, 38);
        c.fillRect(this.x, this.y+75+37, 20, 38);
        c.fillRect(this.x+380, this.y+75+37, 20, 38);

        c.stroke();
    }

    this.update = function(){
        this.y += this.dy;

        this.draw()
    }
}

function Car(x, y, dx, dy, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
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

    this.startMovingLeft = function(){
        this.dx = -2;
    }

    this.startMovingRight = function(){
        this.dx = 2;
    }

    this.stopMoving = function(){
        this.dx = 0;
    }

    this.update = function(){
        this.y += this.dy;
        if(this.x + this.dx <= 550 && this.x + this.dx >= 260){
            this.x += this.dx;
        }
        this.draw()
    }
}

roadSpeed=2;

var car = new Car(400, 400, 0, 0, "red");

var obstacles = [];

var roadLines = [];
roadLines.push(new Roadline(200, -150, roadSpeed));
roadLines.push(new Roadline(200, 0, roadSpeed));
roadLines.push(new Roadline(200, 150, roadSpeed));
roadLines.push(new Roadline(200, 300, roadSpeed));
roadLines.push(new Roadline(200, 450, roadSpeed));
var circle;

function draw() {
    i += di;
    c.fillStyle = "green";
    c.fillRect(0, 0, canvas.width, canvas.height);

    
    roadLines = roadLines.filter(line => line.y < 600);
    if(roadLines.length < 5){
        roadLines.push(new Roadline(200, -150, roadSpeed));
    }
    roadLines.forEach((line) => {
        line.update();
    });
    obstacles = obstacles.filter(obstacle => obstacle.y < 600);
    if(obstacles.length == 0){
        if(Math.random() > 0.5){
            obstacles.push(new Car(300, -150, 0, 2, "green"));
        }else{
            obstacles.push(new Car(500, -150, 0, 2, "green"));
        }
        
    }
    obstacles.forEach((obstacle) => {
        obstacle.update();
    });
    car.update();
}