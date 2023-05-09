// Определяем канвас
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

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

//Координаты еды
let food = {
    x: Math.floor((Math.random() * 10 + 1)) * box,
    y: Math.floor((Math.random() * 10 + 1)) * box,
};

//Координаты змейки
let snake = [];
snake[0] = {
    x: 5 * box,
    y: 5 * box
}

document.addEventListener('keydown', direction);

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
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y ) {
        clearInterval(game);

        ctx.fillStyle = "black";
        ctx.font = "60px Roboto";
        ctx.fillText("GAME OVER", box * 2.5, box * 6.5);

        ctx.fillStyle = "black";
        ctx.font = "50px Roboto";
        ctx.fillText("Press F5 to restart", box * 2.5, box * 8);
        }
    }
}

//Рисуем игру
function drawGame() {
    ctx.drawImage(field, 0, 0);

    ctx.drawImage(foodImage, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "dark green";
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

        ctx.fillStyle = "black";
        ctx.font = "60px Roboto";
        ctx.fillText("GAME OVER", box * 2.5, box * 6.5);

        ctx.fillStyle = "black";
        ctx.font = "50px Roboto";
        ctx.fillText("Press F5 to restart", box * 2.5, box * 8);
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
}

//Вызываем функцию drawGame каждые 100мс, чтобы картинка отображалась
let game = setInterval(drawGame, 100);