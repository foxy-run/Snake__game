// Определяем канвас
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const btn = document.querySelector(".restart__button");

// Вызываем картинку игрового поля
const field = new Image();
field.src = "images/field.png";

// Вызываем картинку еды
const foodImage = new Image();
foodImage.src = "images/food.png";

const cup = new Image();
cup.src = "images/cup.png";

//Высота-ширина 1 клетки
let box = 50;

//Счетчик очков
let score = 0;

//Лучший результат
let highScore = 0;
if (localStorage.getItem("bestScore")) {
    highScore = localStorage.getItem("bestScore")
};

//Координаты еды
let food = {
    x: Math.floor((Math.random() * 10 + 1)) * box,
    y: Math.floor((Math.random() * 10 + 1)) * box,
};

//Координаты змейки
let snake = [
    { x: 5 * box, y: 5 * box },
    // { x: 6 * box, y: 5 * box }
]


//Вешаем обработчик событий по нажатию стрелок на клавиатуре
document.addEventListener('keydown', direction);
// document.addEventListener('click', re)

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
};


//Отображаем текст при окончании игры
function endGame() {
    ctx.fillStyle = "black";
    ctx.font = "60px Roboto";
    ctx.fillText("GAME OVER", box * 2.5, box * 6.5);

    ctx.fillStyle = "black";
    ctx.font = "50px Roboto";
    ctx.fillText("Press Restart", box * 3.5, box * 8);
};

//Прекращаем игру, если змея съела хвост
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
};

//Игра
function drawGame() {
    ctx.drawImage(field, 0, 0);

    ctx.drawImage(foodImage, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };

    ctx.fillStyle = "black";
    ctx.font = "50px Roboto";
    ctx.fillText("Score:", box * 1, box * 0.75);

    ctx.fillStyle = "black";
    ctx.font = "50px Roboto";
    ctx.fillText(score, box * 4.25, box * 0.75);

    ctx.drawImage(cup, box * 7, box * 0);

    ctx.fillStyle = "black";
    ctx.font = "50px Roboto";
    ctx.fillText(":", box * 8, box * 0.75);

    ctx.fillStyle = "black";
    ctx.font = "50px Roboto";
    ctx.fillText(highScore, box * 8.5, box * 0.75);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 10 + 1)) * box,
            y: Math.floor((Math.random() * 10 + 1)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 10 || snakeY < box || snakeY > box * 10) {
        clearInterval(game);

        endGame();
    };

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);

    if (score > highScore) {
        localStorage.setItem("bestScore", score)
    }
};

//Вызываем функцию drawGame каждые 100мс, чтобы картинка отображалась
let game = setInterval(drawGame, 100);