class Canvas {
    constructor() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        this.field = new Image();
        this.field.src = "images/field.png";

        this.cup = new Image();
        this.cup.src = "images/cup.png";
    }

    draw() {
        this.ctx.drawImage(this.field, 0, 0);

        this.ctx.fillStyle = "black";
        this.ctx.font = "50px Roboto";
        this.ctx.fillText("Score:", config.box * 1, config.box * 0.75);

        this.ctx.drawImage(this.cup, config.box * 7, config.box * 0);

        this.ctx.fillStyle = "black";
        this.ctx.font = "50px Roboto";
        this.ctx.fillText(":", config.box * 8, config.box * 0.75);
    }
}


class Config {
    constructor() {
        this.box = 50;
        this.speed = 0.5;
    }
}

class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas.ctx;
        this.config = config.box;

        this.food = new Image();
        this.food.src = "images/food.png";

        this.randomizerFoodPosition();
    }

    draw() {
        this.canvas.drawImage(this.food, this.x, this.y);
    }

    randomizerFoodPosition() {
        this.x = Math.floor((Math.random() * 10 + 1)) * this.config;
        this.y = Math.floor((Math.random() * 10 + 1)) * this.config;
    }
}

class Snake {
    constructor() {
        this.x = 5 * config.box;
        this.y = 5 * config.box;
        this.dx = config.box;
        this.dy = 0;
        this.tails = [];
        this.maxTails = 2;

        this.updata();
        this.control();
    }

    updata() {
        setTimeout(this.updata.bind(this), 100 / config.speed);

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < config.box) {
            this.x = config.box;
        } else if (this.x > config.box * 10) {
            this.x = config.box * 10;
        } else if (this.y < config.box) {
            this.y = config.box;
        } else if (this.y > config.box * 10) {
            this.y = config.box * 10;

        }

        this.tails.unshift({
            x: this.x,
            y: this.y
        });

        if (this.tails.length > this.maxTails) {
            this.tails.pop();
        }

        this.tails.forEach((item, index) => {
            if (item.x === food.x && item.y === food.y) {
                this.maxTails++;

                score.increaseScore();
                score.increaseSpeed();
                food.randomizerFoodPosition();
            }

            for (let i = index + 1; i < this.tails.length; i++) {
                if (item.x === this.tails[i].x && item.y === this.tails[i].y) {
                    this.refreshGame();
                }
            }
        })
    }

    draw() {
        this.tails.forEach((item, index) => {
            if (index === 0) {
                canvas.ctx.fillStyle = 'red';
            } else {
                canvas.ctx.fillStyle = 'green';
            }
            canvas.ctx.fillRect(item.x, item.y, config.box - 1, config.box - 1);
        })
    }

    refreshGame() {
        score.refreshScore();
        this.dir = 'right';

        this.x = 5 * config.box;
        this.y = 5 * config.box;
        this.tails = [];
        this.maxTails = 2;
        this.dx = config.box;
        this.dy = 0;

        config.speed = 0.5;
        clearInterval(gameStart);
        gameStart = setInterval(game.draw, 100);

        food.randomizerFoodPosition();

        alert('You Loose');
    }

    control() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 37 && this.dir !== 'right') {
                this.dir = 'left';
                this.dx = -config.box;
                this.dy = 0;
            } else if (event.keyCode === 38 && this.dir !== 'down') {
                this.dir = 'up';
                this.dx = 0;
                this.dy = -config.box;
            } else if (event.keyCode === 39 && this.dir !== 'left') {
                this.dir = 'right';
                this.dx = config.box;
                this.dy = 0;
            } else if (event.keyCode === 40 && this.dir !== 'up') {
                this.dir = 'down';
                this.dx = 0;
                this.dy = config.box;
            }
        })

    }

}

class Score {
    #score
    #bestScore

    constructor() {
        this.#score = 0;
        this.#bestScore = 0;
    }

    increaseScore() {
        this.#score++;
    }

    increaseSpeed() {
        switch (score.#score) {
            case 1:
                config.speed += 0.2;
                break
            case 2:
                config.speed += 0.2;
                break
            case 3:
                config.speed += 0.2;
                break
            case 4:
                config.speed += 0.2;
                break
            case 5:
                config.speed += 0.2;
                break
            case 6:
                config.speed += 0.2;
                break
            case 7:
                config.speed += 0.2;
                break
        }

        gameStart = setInterval(game.draw, 100);
    }

    refreshScore() {
        if (this.#score > score.#bestScore) {
            localStorage.setItem('bestScore', this.#score);
        }
        score.#bestScore = Number(localStorage.getItem('bestScore'));
        this.#score = 0;
    }

    localStorageScore() {
        if (localStorage.getItem('bestScore')) {
            score.#bestScore = Number(localStorage.getItem('bestScore'));
        } else {
            score.#bestScore = 0;
        }
    }

    draw() {
        canvas.ctx.fillStyle = "black";
        canvas.ctx.font = "50px Roboto";
        canvas.ctx.fillText(this.#score, config.box * 4.25, config.box * 0.75);

        canvas.ctx.fillStyle = "black";
        canvas.ctx.font = "50px Roboto";
        canvas.ctx.fillText(this.#bestScore, config.box * 8.5, config.box * 0.75);
    }

}

class Game {
    draw() {
        canvas.draw();
        food.draw();
        snake.draw();
        score.draw();
    }
}

let canvas = new Canvas();
let config = new Config();
let food = new Food();
let snake = new Snake();
let score = new Score();

const game = new Game();

score.localStorageScore();

let gameStart = setInterval(game.draw, 100);


