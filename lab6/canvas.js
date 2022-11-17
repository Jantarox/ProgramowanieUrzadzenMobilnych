var canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");

setInterval(draw, 10);
var i = 0;
var di = 1;
var g = 0.2;

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowLeft") {
    car.startMovingLeft();
  } else if (key === "ArrowRight") {
    car.startMovingRight();
  } else if (key === " ") {
    car.shoot();
  } else if (key === "a") {
    if (roadSpeed < 10){
        objects.forEach((object) => {
            object.dy++;
          });
        roadSpeed++;
    }
      
  } else if (key === "z") {
    if (roadSpeed > 1){
        objects.forEach((object) => {
            object.dy--;
          });
        roadSpeed--;
    }
  } else if (key === "ArrowUp") {
    car.startMovingUp();
  } else if (key === "ArrowDown") {
    car.startMovingDown();
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key;

  if (key === "ArrowLeft") {
    car.stopMovingLeft();
  } else if (key === "ArrowRight") {
    car.stopMovingRight();
  } else if (key === "ArrowUp") {
    car.stopMovingUp();
  } else if (key === "ArrowDown") {
    car.stopMovingDown();
  }
});

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
  };

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
  };
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
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function Roadline(x, y, dy) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.draw = function () {
    c.beginPath();
    c.strokeStyle = "black";
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 400, 150);
    c.strokeStyle = "white";
    c.fillStyle = "white";
    c.fillRect(this.x + 175, this.y, 50, 75);
    c.fillRect(this.x, this.y, 20, 37);
    c.fillRect(this.x + 380, this.y, 20, 37);
    c.fillRect(this.x, this.y + 75, 20, 37);
    c.fillRect(this.x + 380, this.y + 75, 20, 37);
    c.strokeStyle = "red";
    c.fillStyle = "red";
    c.fillRect(this.x, this.y + 37, 20, 38);
    c.fillRect(this.x + 380, this.y + 37, 20, 38);
    c.fillRect(this.x, this.y + 75 + 37, 20, 38);
    c.fillRect(this.x + 380, this.y + 75 + 37, 20, 38);

    c.stroke();
  };

  this.update = function () {
    this.y += this.dy;

    this.draw();
  };
}

function Car(x, y, dx, dy, color, id) {
  this.x = x;
  this.y = y;

  this.w = 80;
  this.h = 150;

  this.dx = dx;
  this.dy = dy;

  this.id = id;

  this.color = color;
  this.draw = function () {
    c.beginPath();
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fillRect(this.x - this.w / 2, this.y, this.w, 150);
    c.strokeStyle = "black";
    c.fillStyle = "white";
    c.arc(this.x - (this.w / 2 - 10), this.y + 30, 20, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();
    c.beginPath();
    c.arc(this.x - (this.w / 2 - 10), this.y + this.h - 30, 20, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();
    c.beginPath();
    c.arc(this.x + (this.w / 2 - 10), this.y + 30, 20, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();
    c.beginPath();
    c.arc(this.x + (this.w / 2 - 10), this.y + this.h - 30, 20, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();
  };

  this.startMovingLeft = function () {
    this.dx = -roadSpeed;
  };

  this.startMovingRight = function () {
    this.dx = roadSpeed;
  };

  this.stopMovingLeft = function () {
    if (this.dx == -roadSpeed) this.dx = 0;
  };

  this.stopMovingRight = function () {
    if (this.dx == roadSpeed) this.dx = 0;
  };

  this.startMovingUp = function () {
    this.dy = -roadSpeed;
  };

  this.startMovingDown = function () {
    this.dy = roadSpeed;
  };

  this.stopMovingUp = function () {
    if (this.dy == -roadSpeed) this.dy = 0;
  };

  this.stopMovingDown = function () {
    if (this.dy == roadSpeed) this.dy = 0;
  };

  this.shoot = function () {
    if (gameInProgress) bullets.push(new Bullet(this.x, this.y, i));
  };

  this.update = function () {
    this.y += this.dy;
    if (this.x + this.dx <= 550 && this.x + this.dx >= 260) {
      this.x += this.dx;
    }
    this.draw();
  };
}

function Bullet(x, y, id) {
  this.x = x;
  this.y = y;
  this.dy = -4;
  this.r = 5;
  this.id = id;

  this.draw = function () {
    c.beginPath();

    c.strokeStyle = "blue";
    c.fillStyle = "white";
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();
  };

  this.update = function () {
    //Colision with boundaries
    if (this.y > canvas.height - this.r || this.y < this.r) {
      bullets = bullets.filter((bullet) => bullet.id !== this.id);
    }
    this.hit();

    this.y += this.dy;
    this.draw();
  };

  this.hit = function () {
    obstacles.forEach((car) => {
      if (
        this.x - this.r < car.x - 40 + car.w &&
        this.x + this.r > car.x - 40 &&
        this.y - this.r < car.y + car.h &&
        this.y + this.r > car.y
      ) {
        bullets = bullets.filter((bullet) => bullet.id !== this.id);
        obstacles = obstacles.filter((car1) => car.id !== car1.id);
      }
    });
  };
}

function Bonus(x, y, width, height, dx, dy, color, id) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.id = id;

  this.draw = function () {
    c.beginPath();
    c.rect(this.x, this.y, this.width, this.height);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.stroke();
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function checkCarColision(car1, car2) {
  if (
    car1.x - 40 < car2.x - 40 + car2.w &&
    car1.x - 40 + car1.w > car2.x - 40 &&
    car1.y < car2.y + car2.h &&
    car1.h + car1.y > car2.y
  ) {
    return true;
  }
  return false;
}

function checkBonusColision(car, bonus) {
  if (
    car.x - 40 < bonus.x + bonus.width &&
    car.x - 40 + car.w > bonus.x &&
    car.y < bonus.y + bonus.height &&
    car.h + car.y > bonus.y
  ) {
    return true;
  }
  return false;
}

var roadSpeed = 3;
var points = 0;
var gameInProgress = true;
c.font = "30px Arial";

var car = new Car(400, 400, 0, 0, "red");
var obstacles = [];
var bullets = [];
var bonuses = [];

var roadLines = [];
roadLines.push(new Roadline(200, -150, roadSpeed));
roadLines.push(new Roadline(200, 0, roadSpeed));
roadLines.push(new Roadline(200, 150, roadSpeed));
roadLines.push(new Roadline(200, 300, roadSpeed));
roadLines.push(new Roadline(200, 450, roadSpeed));
roadLines.push(new Roadline(200, 600, roadSpeed));

var objects = [...obstacles, ...bonuses, ...roadLines];

function draw() {
  i += di;
  c.fillStyle = "green";
  c.fillRect(0, 0, canvas.width, canvas.height);

  roadLines.forEach((line) => {
    if (line.y >= canvas.height) {
      line.y -= canvas.height + 150;
    }
    line.update();
  });
  obstacles = obstacles.filter((obstacle) => obstacle.y < 600);
  bonuses = bonuses.filter((bonus) => bonus.y < 600);

  if (obstacles.length == 0) {
    if (Math.random() > 0.5) {
      obstacles.push(new Car(300, -150, 0, roadSpeed, "green", i));
      bonuses.push(new Bonus(475, -100, 50, 50, 0, roadSpeed, "yellow", i));
    } else {
      obstacles.push(new Car(500, -150, 0, roadSpeed, "green", i));
      bonuses.push(new Bonus(275, -100, 50, 50, 0, roadSpeed, "yellow", i));
    }
  }

  obstacles.forEach((obstacle) => {
    obstacle.update();
    if (checkCarColision(car, obstacle)) {
      gameInProgress = false;
    }
  });

  bonuses.forEach((bonus) => {
    bonus.update();
    if (checkBonusColision(car, bonus) && gameInProgress) {
      points++;
      bonuses = bonuses.filter((bonus1) => bonus1.id != bonus.id);
    }
  });

  c.fillStyle = "blue";
  c.fillText(`Points: ${points}`, 10, 30);
  c.fillText(`Speed: ${roadSpeed}0 km/h`, 10, 60);

  

  car.update();

  if (!gameInProgress) {
    c.fillStyle = "red";
    c.fillText(`Game over!`, canvas.width / 2 - 80, canvas.height / 2);
  }
  bullets.forEach((bullet) => {
    bullet.update();
  });

  objects = [...obstacles, ...bonuses, ...roadLines];
}
