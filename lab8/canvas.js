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
        gameBoard.dropCircle();
    }
})

document.addEventListener('click', (event) => {
    const button = event.button;

    if (button === 0) {
        gameBoard.putStone();
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
    this.circleRadius = 15;
    this.margin = 20;

    this.gameInProgress = true;
    this.whiteTurn = true;

    this.text = "Whites turn";

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
        c.strokeStyle = "brown";
        c.fillStyle = "brown";
        c.fillRect(this.x, this.y, totalWidth, totalHeight);
        c.closePath();
        c.stroke();

        for (var i = 0; i < this.width; i++){
            c.beginPath();
            c.moveTo(this.x + this.margin + this.circleRadius + (this.circleRadius * 2 + this.margin) * i, this.y)
            c.lineTo(this.x + this.margin + this.circleRadius + (this.circleRadius * 2 + this.margin) * i, this.y+totalHeight);
            c.strokeStyle = "black";
            c.lineWidth = 4;
            c.stroke();
        }

        for (var i = 0; i < this.height; i++){
            c.beginPath();
            c.moveTo(this.x, this.y + this.margin + this.circleRadius + (this.circleRadius * 2 + this.margin) * i)
            c.lineTo(this.x + totalWidth, this.y + this.margin + this.circleRadius + (this.circleRadius * 2 + this.margin) * i);
            c.strokeStyle = "black";
            c.lineWidth = 3;
            c.stroke();
        }


        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                c.beginPath();

                var circleX = this.x + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * j;
                var circleY = this.y + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * i;

                if (this.board[j][i] === 0) {
                    continue;
                } else if (this.board[j][i] === 1) {
                    c.strokeStyle = "black";
                    c.fillStyle = "black";
                } else if (this.board[j][i] === 2) {
                    c.strokeStyle = "white";
                    c.fillStyle = "white";
                }

                c.arc(circleX, circleY, this.circleRadius, 0, Math.PI * 2);
                c.fill();
                c.closePath();
                c.stroke();
            }
        }

        c.font = "30px Arial";
        c.fillStyle = "black";
        c.fillText(this.text, this.x, this.y - this.margin)
    }

    this.putStone = function(x, y){
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                var circleX = this.x + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * j;
                var circleY = this.y + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * i;

                

                if (this.board[j][i] === 0) {
                    continue;
                } else if (this.board[j][i] === 1) {
                    c.strokeStyle = "black";
                    c.fillStyle = "black";
                } else if (this.board[j][i] === 2) {
                    c.strokeStyle = "white";
                    c.fillStyle = "white";
                }

                c.arc(circleX, circleY, this.circleRadius, 0, Math.PI * 2);
                c.fill();
                c.closePath();
                c.stroke();
            }
        }
    }

    this.endGame = function (draw) {
        this.gameInProgress = false;
        if(draw)
            this.text = "Draw!";
        else if (this.redTurn)
            this.text = "Red wins!";
        else
            this.text = "Yellow wins!";
    }
}

var gameBoard = new GameBoard(50, 50, 14, 10);
gameBoard.init();

function draw() {
    i += di;
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.font = "20px Arial";
    c.fillStyle = "black";
    // c.fillText("Use arrows to choose a place to drop a token, use space to drop a token", 10, 30);

    gameBoard.draw();
}