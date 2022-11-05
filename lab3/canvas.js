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
    }else if(key === " "){
        if(gameInProgress === false){
            gameInProgress = true;
            ball.dy = -2;
            ball.dx = 2;
        }
    }
})

function Circle(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.bounced = false;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        c.stroke();
    }

    this.update = function () {
        //Colision with boundaries
        if (this.x > canvas.width - this.r || this.x < this.r) {
            this.dx *= -1;
            this.bounced = true;
        }
        // if (this.y > canvas.height - this.r || this.y < this.r) {
        //     this.dy *= -1;
        // }
        if (this.y < this.r && !this.bounced) {
            this.dy *= -1;
            this.bounced = true;
        }

        rects.forEach(rect => {

            if (this.x + this.r > rect.x &&
                this.x - this.r < rect.x + rect.width &&
                this.y - this.r < rect.y + rect.height &&
                this.y + this.r > rect.y && 
                !this.bounced) {
                
                    rect.hit = true;
                    if (this.y < rect.y || this.y > rect.y + rect.height) {
                        this.dy *= -1;
                        this.bounced = true;
                    }
                    else if (this.x < rect.x || this.x > rect.x + rect.width) {
                        this.dx *= -1;
                        this.bounced = true;
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
    this.hit = false;

    this.draw = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.stroke();
        c.closePath();
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
var ball = new Circle(400, 540, 0, 0, 10, "green");
var gameInProgress = false;

var rects = [];


rects.push(plate);

var boxSize = 50;

for(var i=0; i<2; i++){
    var j=0;
    while(true){
        var color;
        if((j+i) % 2 ){
            color = "red";
        }else{
            color = "blue";
        }

        rects.push(new Rectangle(j*boxSize, i*boxSize+boxSize+20,boxSize, boxSize, 0, 0, color));
        j++;
        if(j*boxSize >= canvas.width){
            break;
        }
    }
}


function draw() {
    i += di;
    c.clearRect(0, 0, canvas.width, canvas.height);

    if(gameInProgress === false){
        ball.x = plate.x + plate.width/2;
        ball.y = plate.y - ball.r;
    }

    ball.update();
    ball.bounced = false;
    rects.forEach(rect => {
        rect.update();
    })
    rects = rects.filter(rect => !rect.hit || rect.color === "black");
    
    if(ball.y > canvas.height + 50){
        gameInProgress = false;
        ball.dx = 0;
        ball.dy = 0;
    }
}