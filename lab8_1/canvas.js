var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;

document.addEventListener('mousedown', (event) => {
    const button = event.button;

    if (button === 0) {
        gameBoard.putStone(event.clientX, event.clientY);
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
    this.blackTurn = true;

    this.text = "Blacks turn";
    this.neighbours = [];

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

    this.putStone = function(mouseX, mouseY){
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                var circleX = this.x + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * j;
                var circleY = this.y + this.margin + this.circleRadius + (2 * this.circleRadius + this.margin) * i;

                if(pythagoras(mouseX-10, mouseY-10, circleX, circleY) <= this.circleRadius + 2){
                    if(this.board[j][i] !== 0)
                        return;
                    this.board[j][i] = this.blackTurn ? 1 : 2;
                    this.blackTurn = !this.blackTurn;
                    this.text = this.blackTurn ? "Blacks turn" : "Whites turn";
                    this.checkForCapture(j+1, i);
                    this.checkForCapture(j-1, i);
                    this.checkForCapture(j, i+1);
                    this.checkForCapture(j, i-1);
                    return;
                }
            }
        }
    }

    this.checkForCapture = function(x, y){
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        var color = this.board[x][y];
        if(color === 0) return;

        this.getNeighboursWithSameColor(x, y);

        var capture = true;
        this.neighbours.every(stone => {
            if(this.checkIfEmpty(stone.x+1, stone.y)) capture = false;
            if(this.checkIfEmpty(stone.x-1, stone.y)) capture = false;
            if(this.checkIfEmpty(stone.x, stone.y+1)) capture = false;
            if(this.checkIfEmpty(stone.x, stone.y-1)) capture = false;
            return capture;
        });
        
        if(capture){
            this.neighbours.forEach(stone => this.board[stone.x][stone.y] = 0);
        }

    }

    this.checkIfEmpty = function(x, y){
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        return this.board[x][y] === 0; 
    }

    this.getNeighboursWithSameColor = function(x, y){
        var color = this.board[x][y]
        this.neighbours = [];
        this.addNeighbour(x, y, color);
    }

    this.addNeighbour = function(x, y, color){
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        if(this.board[x][y] !== color) return;
        if(this.neighbours.some((stone) => stone.x === x && stone.y === y)) return;

        this.neighbours.push({x: x, y: y});
        this.addNeighbour(x+1, y, color);
        this.addNeighbour(x-1, y, color);
        this.addNeighbour(x, y+1, color);
        this.addNeighbour(x, y-1, color);
    }
}

pythagoras = function(x1, y1, x2, y2) {
    var x = Math.pow(x1 - x2, 2);
    var y = Math.pow(y1 - y2, 2);
    return Math.sqrt(x + y);
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