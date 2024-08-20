const gameBoard = document.querySelector('#gameBoard');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const ctx = gameBoard.getContext('2d');

//  DEFAULT WINDOW PARAMETERS
const boardWidth = gameBoard.width;

// IN-GAME PARAMETERS
const units = 25;
const nCells = 20;
const cellSize = boardWidth / nCells;
const drawSize = cellSize - 1;
let intervalTime = 200;

// SNAKE
let snake = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0}
];
let direction = {x: 1, y: 0};

// APPLE
let apple = {x: 0, y: 0};


// ===== FUNCTIONS =====
// Core functions

window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    spawnSnake();
    generateApple();
    setInterval(update, intervalTime);
}

function update() {
    moveSnake();
    borderCollision();
    updateScore();
} 

function drawGame() {
    ctx.clearRect(0, 0, boardWidth, boardWidth);
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, drawSize, drawSize)
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, drawSize, drawSize);

}


// Functions to move the snake:
// Direction handler
function changeDirection(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            if (direction.y === 0) {
                direction = {x: 0, y: -1};
            } break;
        case 'ArrowDown':
        case 's':
            if (direction.y === 0) {
                direction = {x: 0, y: 1};
            } break;
        case "ArrowLeft":
        case "a":
            if (direction.x === 0) {
                direction = {x: -1, y: 0};
            } break;
        case "ArrowRight":
        case "d":
            if (direction.x === 0) {
                direction = {x: 1, y: 0};
            } break;
    }
}
// Move the body with the direction handler
function moveSnake () {
        let newHead = {
            x: snake[0].x + direction.x * cellSize,
            y: snake[0].y + direction.y * cellSize
        };
        if (!(newHead.x === apple.x && newHead.y === apple.y)) {

            snake.unshift(newHead);
            snake.pop();

            drawGame();
        } else {
            eatApple();
            console.log(snake.length);
    }
}

// Border collision effect Function
function borderCollision () {
    if((snake[0].x + direction.x * cellSize) > boardWidth) {
        snake[0].x = 0;
    } else if ((snake[0].x - direction.x * cellSize) < 0) {
        snake[0].x = boardWidth;
    } else if ((snake[0].y + direction.y * cellSize) > boardWidth) {
        snake[0].y = 0;
    } else if ((snake[0].y - direction.y * cellSize) < 0) {
        snake[0].y = boardWidth;
    }
}

// Function to randomly generate an apple, in the unit grid
function generateApple () {
    apple.x = (Math.round(Math.random() * (nCells - 1)) * units);
    apple.y = (Math.round(Math.random() * (nCells - 1)) * units);
}

// Function to spawn the snake in the middle of the Canvas
function spawnSnake () {
    let initialX = Math.floor((nCells / 2) * units);
    let initialY = Math.floor((nCells / 2) * units);

    snake = [];
    for (let i = 0; i < 5; i++) {
        snake.push({
            x: initialX - (i * cellSize),
            y: initialY
        });
    }

    drawGame();
}

// Eating functions
function increaseLength () {
    let newHead = {
        x: snake[0].x + direction.x * cellSize,
        y: snake[0].y + direction.y * cellSize
    };

    snake.unshift(newHead);

    drawGame();
}
function eatApple () {
        generateApple();
        increaseLength();
        drawGame();
}

// Update the score
function updateScore () {
    scoreText.textContent = snake.length - 5;
}



// TODO FUNCTIONS
function startGame() {}
function resetScore () {}
function isGameOver () {}





