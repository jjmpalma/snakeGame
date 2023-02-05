//Author: Juan Manuel Palma Arroyo (jmp16). Two main resources has been used as reference:
//https://www.w3schools.com/graphics/game_intro.asp
//https://eloquentjavascript.net/16_game.html

var canvas = document.querySelector(".myCanvas");
var ctx = canvas.getContext("2d");

var refreshId;

var unit = 10;
var rows = canvas.height / unit;
var col = canvas.width / unit;

//SETUP
function startGame() {
    snake = new snake();
    berries = new berries();
    berries.coordinatesGenerator();

    refreshId = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        berries.draw();
        snake.draw();
        snake.update();

        if (snake.collisionItself()) {
            endGame();
        }

        if (snake.collision(berries)) {
            berries.coordinatesGenerator();
        }

        document.querySelector("#score").innerHTML = snake.length;
    }, 225);
}

//SNAKE
function snake() {
    this.x = 0;
    this.y = 0;
    this.speedX = unit;
    this.speedY = 0;
    this.tail = [];
    this.length = 0;

    //Draws unit squares representing the snake
    this.draw = function() {
        //Fill the cells that make up the complete snake
        for (var i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = "#40576e";
            ctx.fillRect(this.tail[i].xPos, this.tail[i].yPos, unit, unit);
        }
        ctx.fillStyle = "#f05454";
        ctx.fillRect(this.x, this.y, unit, unit);
    };

    //Updates the snake position
    this.update = function() {
        //keep snake cells coordinates
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.length - 1] = {
            xPos: this.x,
            yPos: this.y,
        };

        //Speed
        this.x += this.speedX;
        this.y += this.speedY;

        //Out of bounds
        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    };

    //Change snake direction
    this.newDirection = function(direcc) {
        if (direcc == "Up") {
            this.speedX = 0;
            this.speedY = -unit;
        }
        if (direcc == "Down") {
            this.speedX = 0;
            this.speedY = unit;
        }
        if (direcc == "Right") {
            this.speedX = unit;
            this.speedY = 0;
        }
        if (direcc == "Left") {
            this.speedX = -unit;
            this.speedY = 0;
        }
    };

    //Check for collisions - Itself
    this.collisionItself = function() {
        for (var i = 0; i < this.tail.length; i++) {
            console.log(i);
            console.log(this.x);
            console.log(this.x);
            console.log(this.tail[i].xPos);
            console.log(this.tail[i].yPos);
            console.log("---")
        }
        for (var i = 0; i < this.tail.length; i++) {
            if ((this.x == this.tail[i].xPos) && (this.y == this.tail[i].yPos)) {
                return true;
            }
        }
        return false;
    };

    //Check for collisions - Snake eat berry
    this.collision = function(berry) {
        if (this.x == berry.x && this.y == berry.y) {
            this.length++;
            return true;
        }
        return false;
    };
}

//BERRYS
function berries() {
    this.x;
    this.y;

    this.coordinatesGenerator = function() {
        this.x = (Math.floor(Math.random() * col - 1) + 1) * unit;
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * unit;
    };

    this.draw = function() {
        ctx.fillStyle = "#e8e8e8";
        ctx.fillRect(this.x, this.y, unit, unit);
    };
}

//BUTTONS
document.getElementById("btnUp").addEventListener("click", () => {
    snake.newDirection("Up");
});
document.getElementById("btnDown").addEventListener("click", () => {
    snake.newDirection("Down");
});
document.getElementById("btnRight").addEventListener("click", () => {
    snake.newDirection("Right");
});
document.getElementById("btnLeft").addEventListener("click", () => {
    snake.newDirection("Left");
});
document.getElementById("btnStart").addEventListener("click", () => {
    startGame();
});

//GAME END
function endGame() {
    document.querySelector("#endGameText").innerHTML = "Game over";
    clearInterval(refreshId);
}