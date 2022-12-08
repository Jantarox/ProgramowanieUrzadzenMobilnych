var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;

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

function GameBoard(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.board = [];
    this.circleRadius = 20;
    this.margin = 20;

    this.init = function(){

        for(var i = 0; i < this.height; i++){
            var row = [];
            for(var j = 0; j < this.width; j++){
                row.push(0);
            }
            this.board.push(row);
        }
        console.log(this.board);
    }

    this.draw = function() {
        var totalWidth = (this.circleRadius*2 + this.margin) * this.width + this.margin;
        var totalHeight = (this.circleRadius*2 + this.margin) * this.height + this.margin;

        c.beginPath();
        c.strokeStyle = "blue";
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y, totalWidth, totalHeight);

        c.closePath();
        c.stroke();
    }
}

var rects = [];
function drawRects() {
    rects.forEach(rect => rect.draw())
}

var circle;
var gameBoard = new GameBoard(50, 50, 7, 6);
gameBoard.init();

function draw() {
    i += di;
    c.clearRect(0, 0, innerWidth, innerHeight);


    gameBoard.draw();
    drawRects();
}