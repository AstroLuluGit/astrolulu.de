const gameBackground = "black";
const gameBorder = "white";
const snakeBackground = "grey";
const snakeBorder = "grey";
const foodBackground = 'purple';
const foodBorder = 'purple';
const blockSize = 20;
const canvas = document.getElementById("game");
const canvasCTX = canvas.getContext("2d");
let tickInterval = 100;
let gameClock; 
let snake = [];
var food;
let directionChanged = false;
let direction = "right";
let points = 0;
let collisionIsChecked = false;
let storedHighscore = parseInt(localStorage.getItem('highscore')) || 0;

/*
    Food can spawn in Snake
*/

class SnakeBlock {
    constructor(x, y){
        this.x = x;
        this.y = y;
    } 
}

showHighscore();
clearCanvas();

function startGame() {
    endGame();
    document.getElementById('loosedGame').innerText = '';

    points = 0;
    collisionIsChecked = document.getElementById("borderCollision").checked;
    direction = 'right';
    
    snake = [new SnakeBlock(blockSize, blockSize)];
    generateFood();

    gameClock = setInterval(tick, tickInterval);
}

function randomTile(max) {
    return Math.floor(Math.random() * max) * blockSize;
}

function randomTileX() {
    return randomTile(canvas.width / blockSize);
}

function randomTileY() {
    return randomTile(canvas.height / blockSize);
}

function endGame() {
    clearCanvas();
    clearInterval(gameClock);
    document.getElementById('loosedGame').innerText = 'You lost the game!';
}

function tick() {
    moveSnake();
    render();
    directionChanged = false; 
}
function clearCanvas() {
    canvasCTX.fillStyle = gameBackground;
    canvasCTX.strokeStyle = gameBorder;
    canvasCTX.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = function() {
    addEventListener('keydown', (event) => {     
        if (directionChanged) return;

        if (event.key == 'ArrowUp' && direction != 'down') {
            directionChanged = true;
            direction = 'up';
        }
        if (event.key == 'ArrowDown' && direction != 'up') {
            directionChanged = true;
            direction = 'down';
        }
        if (event.key == 'ArrowRight' && direction != 'left') {
            directionChanged = true;
            direction = 'right';
        }
        if (event.key == 'ArrowLeft' && direction != 'right') {
            directionChanged = true;
            direction = 'left';
        }
    });
}    

function moveSnake() {
    const newSnakeHead = {...snake[0]};

    if (collisionIsChecked) {
        if (direction == "up") {
            if (newSnakeHead.y <= 0) {
                endGame();            
            } else {
                newSnakeHead.y -= blockSize;
            }
        }
        else if (direction == "down") {
            if (newSnakeHead.y + blockSize >= canvas.height) {
                endGame();
            } else {
                newSnakeHead.y += blockSize;
            }
        }
        else if (direction == "right") {
            if (newSnakeHead.x + blockSize >= canvas.width) {
                endGame();
            } else {
                newSnakeHead.x += blockSize;    
            }
        }
        else if (direction == "left") {
            if (newSnakeHead.x <= 0) {
                endGame();
            } else {            
                newSnakeHead.x -= blockSize;
            }
        }
    } else {
        if (direction == "up") {
            if (newSnakeHead.y <= 0) {
                newSnakeHead.y = canvas.height - blockSize;
            } else {
                newSnakeHead.y -= blockSize;
            }
        }
        else if (direction == "down") {
            if (newSnakeHead.y + blockSize >= canvas.height) {
                newSnakeHead.y = 0;
            } else {
                newSnakeHead.y += blockSize;
            }
        }
        else if (direction == "right") {
            if (newSnakeHead.x + blockSize >= canvas.width) {
                newSnakeHead.x = 0;
            } else {
                newSnakeHead.x += blockSize;    
            }
        }
        else if (direction == "left") {
            if (newSnakeHead.x <= 0) {
                newSnakeHead.x = canvas.width - blockSize;
            } else {            
                newSnakeHead.x -= blockSize;
            }
        }
    }
    

    snake.unshift(newSnakeHead);
    snake.pop();

    // check snake collosion
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) continue;

        const snakeX = snake[i].x;
        const snakeY = snake[i].y;
        if (newSnakeHead.x == snakeX && newSnakeHead.y == snakeY) endGame();
    }

    // check food position
    if (newSnakeHead.x == food.x && newSnakeHead.y == food.y) {
        generateFood();
        snake.push(newSnakeHead);
        points += 10;

        document.getElementById('sPoints').innerText = 'Points: ' + points;

        if (points > storedHighscore) {
            storedHighscore = points;
            localStorage.setItem('highscore', storedHighscore);
            showHighscore();
        }
    }
}

function showHighscore() {
    document.getElementById('sHighscore').innerText = 'Highscore: ' + storedHighscore;
}

function generateFood() {
    food = new SnakeBlock(randomTileX(), randomTileY());
}

function render() {
    clearCanvas();
    renderSnake();
    renderFood();
}

function renderSnake() {
    for (let i = 0; i < snake.length; i++){
        const snakeX = snake[i].x;
        const snakeY = snake[i].y;

        canvasCTX.fillStyle = snakeBackground;
        canvasCTX.strokeStyle = snakeBorder;

        canvasCTX.fillRect(snakeX, snakeY, blockSize, blockSize)
        canvasCTX.strokeRect(snakeX, snakeY, blockSize, blockSize)
    }
}

function renderFood() {
    canvasCTX.fillStyle = foodBackground;
    canvasCTX.strokeStyle = foodBorder;

    canvasCTX.fillRect(food.x, food.y, blockSize, blockSize);
    canvasCTX.strokeRect(food.x, food.y, blockSize, blockSize);
}