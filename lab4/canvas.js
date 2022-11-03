var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;
var g = 0.2;

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

var road = new Rectangle(200, 0, 400, 600, 0, 0, "black");
var roadLines = [];
roadLines.push(new Rectangle(375, 0, 50, 75, 0, 0, "white"));
roadLines.push(new Rectangle(375, 150, 50, 75, 0, 0, "white"));
roadLines.push(new Rectangle(375, 300, 50, 75, 0, 0, "white"));
roadLines.push(new Rectangle(375, 450, 50, 75, 0, 0, "white"));
var circle;

function draw() {
    i += di;
    c.fillStyle = "green";
    c.fillRect(0, 0, canvas.width, canvas.height);

    road.update();
    roadLines.forEach((line) => line.update());
}