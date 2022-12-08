var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
        gameBoard.moveNewCircleLeft();
    } else if (key === "ArrowRight") {
        gameBoard.moveNewCircleRight();
    } else if (key === " ") {

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

function GameBoard(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = [];
    this.circleRadius = 25;
    this.margin = 20;

    this.gameInProgress = true;
    this.redTurn = true;
    this.newCirclePosition = 0;

    this.init = function () {

        for (var i = 0; i < this.width; i++) {
            var row = [];
            for (var j = 0; j < this.height; j++) {
                row.push(0);
            }
            this.board.push(row);
        }
    }

    this.draw = function () {
        var totalWidth = (this.circleRadius * 2 + this.margin) * this.width + this.margin;
        var totalHeight = (this.circleRadius * 2 + this.margin) * this.height + this.margin;

        c.beginPath();
        c.strokeStyle = "blue";
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y, totalWidth, totalHeight);
        c.closePath();
        c.stroke();


        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                c.beginPath();

                var circleX = this.x + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * j;
                var circleY = this.y + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * i;

                if (this.board[j][i] === 0) {
                    c.strokeStyle = "white";
                    c.fillStyle = "white";
                } else if (this.board[j][i] === 1) {
                    c.strokeStyle = "red";
                    c.fillStyle = "red";
                } else if (this.board[j][i] === 2) {
                    c.strokeStyle = "yellow";
                    c.fillStyle = "yellow";
                }

                c.arc(circleX, circleY, this.circleRadius, 0, Math.PI * 2);
                c.fill();
                c.closePath();
                c.stroke();
            }
        }

        if (this.gameInProgress) {
            var circleX = this.x + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * this.newCirclePosition;
            var circleY = this.y - this.margin - this.circleRadius;

            c.beginPath();

            if (this.redTurn === true) {
                c.strokeStyle = "red";
                c.fillStyle = "red";
            } else {
                c.strokeStyle = "yellow";
                c.fillStyle = "yellow";
            }

            c.arc(circleX, circleY, this.circleRadius, 0, Math.PI * 2);
            c.fill();
            c.closePath();
            c.stroke();
        }
    }

    this.moveNewCircleRight = function () {
        if(this.gameInProgress && this.newCirclePosition + 1 < this.width)
            this.newCirclePosition++;
    }

    this.moveNewCircleLeft = function () {
        if(this.gameInProgress && this.newCirclePosition - 1 >= 0)
            this.newCirclePosition--;
    }
}

var rects = [];
function drawRects() {
    rects.forEach(rect => rect.draw())
}

var circle;
var gameBoard = new GameBoard(150, 150, 7, 6);
gameBoard.init();

function draw() {
    i += di;
    c.clearRect(0, 0, innerWidth, innerHeight);


    gameBoard.draw();
    drawRects();
}