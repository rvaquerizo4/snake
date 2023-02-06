class Game {
    constructor(width, height, amount) {
      this.width = width;
      this.height = height;
      this.amount = amount;
      this.snake = [];
      this.direction = "right";
      this.food = [];
      this.score = 0;
    }
  
    initCanvas(width, height) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
      return this;
    }
  
    start() {
      for (let i = this.amount / 2; i < this.amount / 2 + 3; i++) {
        this.snake.push({ x: i, y: this.amount / 2 });
      }
      this.addFood();
      this.step();
    }
  
    drawSquare(x, y, color) {
      this.context.fillStyle = color;
      this.context.fillRect(
        x * this.width / this.amount,
        y * this.height / this.amount,
        this.width / this.amount,
        this.height / this.amount
      );
    }
  
    drawSnake() {
      this.snake.forEach(part => {
        this.drawSquare(part.x, part.y, "black");
      });
    }
  
    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  
    drawFood() {
      this.food.forEach(part => {
        this.drawSquare(part.x, part.y, "red");
      });
    }
  
    collides(x, y) {
      return this.snake.some(part => part.x === x && part.y === y);
    }
  
    addFood() {
      let x = Math.floor(Math.random() * this.amount);
      let y = Math.floor(Math.random() * this.amount);
      while (this.collides(x, y)) {
        x = Math.floor(Math.random() * this.amount);
        y = Math.floor(Math.random() * this.amount);
      }
      this.food.push({ x, y });
    }
  
    newTile() {
      let newX = this.snake[0].x + (this.direction === "right" ? 1 : this.direction === "left" ? -1 : 0);
      let newY = this.snake[0].y + (this.direction === "down" ? 1 : this.direction === "up" ? -1 : 0);
      if (newX >= this.amount) {
        newX = 0;
      }
      if (newX < 0) {
        newX = this.amount - 1;
      }
      if (newY >= this.amount) {
        newY = 0;
      }
      if (newY < 0) {
        newY = this.amount - 1;
      }
      return [newX, newY];
    }
  
    step() {
        let newTile = this.newTile();
        if (this.collides(newTile[0], newTile[1])) {
          // Game over logic
          return;
        }
      
        this.snake.unshift(newTile);
        this.snake.pop();
      
        if (newTile[0] === this.food[0] && newTile[1] === this.food[1]) {
          this.addFood();
        } else {
          this.clear();
        }
      
        this.drawFood();
        this.drawSnake();
      };

      input(e){
        switch (e.keyCode) {
            case 37:
              if (this.direction !== "right") {
                this.direction = "left";
              }
              break;
            case 38:
              if (this.direction !== "down") {
                this.direction = "up";
              }
              break;
            case 39:
              if (this.direction !== "left") {
                this.direction = "right";
              }
              break;
            case 40:
              if (this.direction !== "up") {
                this.direction = "down";
              }
              break;
          }
      }
      
      
    }
const game = new Game(500, 500, 20);
game.initCanvas(500, 500);
game.start();

document.addEventListener("keydown", function(e) {
  game.input(e);
});

setInterval(function() {
  game.step();
}, 100);


//let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
