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
        rects.forEach(rect => {

            if (this.x + this.r > rect.x &&
                this.x - this.r < rect.x + rect.width &&
                this.y - this.r < rect.y + rect.height &&
                this.y + this.r > rect.y) {
                if (this.y < rect.y || this.y > rect.y + rect.height) {
                    this.dy *= -1;
                    this.dy *= 0.8;
                }
                else if (this.x < rect.x || this.x > rect.x + rect.width) {
                    this.dx *= -1;
                }
            }
        })

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function Rectangle(x, y, width, height) {
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
var circle;

function draw() {
    i += di;

}