const gridGameContainer = document.querySelector(".grid-game");
let scoreContainer = document.querySelector(".game-main-score")
let scoreMaxContainer = document.querySelector(".game-high-score")

let foodX, foodY;
let snakeX = 10, snakeY = 5;
let velX = 0, velY = 0;
let snakeBody = [[10, 5]];
let score = 0
let scoreHigh = localStorage.getItem("game-high-score") || 0

function foodsPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
foodsPosition();

function changeDirection(e) {
    if (e.key === "ArrowDown" && velY === 0) {
        velX = 0;
        velY = 1;
    } else if (e.key === "ArrowUp" && velY === 0) {
        velX = 0;
        velY = -1;
    } else if (e.key === "ArrowRight" && velX === 0) {
        velX = 1;
        velY = 0;
    } else if (e.key === "ArrowLeft" && velX === 0) {
        velX = -1;
        velY = 0;
    }
}

function game() {
    snakeX += velX;
    snakeY += velY;

    if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
        alert("Game Over");
        resetGame();
        return;
    }

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); 
        foodsPosition(); 
        score++
        scoreHigh = score >= scoreHigh ? score : scoreHigh
        localStorage.setItem("scoreHigh", scoreHigh)
        scoreContainer.innerHTML =`Score: ${score}`
        scoreMaxContainer.innerHTML = `High Score: ${scoreHigh}`

    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    snakeBody[0] = [snakeX, snakeY];

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            alert("Game Over / chocaste contigo mismo!");
            resetGame();
            return;
        }
    }

    let markup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        markup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    gridGameContainer.innerHTML = markup;
}

function resetGame() {
    snakeX = 10;
    snakeY = 5;
    velX = 0;
    velY = 0;
    score = 0;
    snakeBody = [[10, 5]];
    foodsPosition();
    scoreContainer.innerHTML = `Score: ${score}`
    
}

setInterval(game, 100);
document.addEventListener("keydown", changeDirection);
