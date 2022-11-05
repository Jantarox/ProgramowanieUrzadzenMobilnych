var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if(key === "ArrowLeft"){
        plate.moveLeft();
    }else if(key === "ArrowRight"){
        plate.moveRight();
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
        //Colision with boundaries
        if (this.x > canvas.width - this.r || this.x < this.r) {
            this.dx *= -1;
        }
        // if (this.y > canvas.height - this.r || this.y < this.r) {
        //     this.dy *= -1;
        // }
        if (this.y < this.r) {
            this.dy *= -1;
        }

        rects.forEach(rect => {

            if (this.x + this.r > rect.x &&
                this.x - this.r < rect.x + rect.width &&
                this.y - this.r < rect.y + rect.height &&
                this.y + this.r > rect.y) {
                if (this.y < rect.y || this.y > rect.y + rect.height) {
                    this.dy *= -1;
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

    this.moveRight = function(){
        if(this.x + this.width < canvas.width){this.x += 10;}
    }

    this.moveLeft = function(){
        if(this.x > 0){this.x -= 10;}
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var plate = new Rectangle(350, 550, 100, 20, 0, 0, "black");
var ball = new Circle(400, 540, 2, -2, 10);

var rects = [];
rects.push(plate);


function draw() {
    i += di;
    c.clearRect(0, 0, canvas.width, canvas.height);


    ball.update();
    plate.update();
}