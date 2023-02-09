

class Juego{

    constructor(width, height, amount) {
      this.width = width;
      this.height = height;
      this.amount = amount;
      this.serpiente = [];
      this.direccion = "right";
      this.menjar = [];
      this.puntuacion = 0;
      this.canvas = null;
        this.ctx = null;

    }

  initCanvas(width, height) {

    this.canvas = document.createElement("canvas");
    this.canvas.height= height;
    this.canvas.width= width;
    
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    
  }

  drawSquare(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.amount, y * this.amount, this.amount, this.amount);
  }

  drawSnake() {
    for (let i = 0; i < this.serpiente.length; i++) {
      this.drawSquare(this.serpiente[i].x, this.serpiente[i].y, "black");
    }
  }

  clear(){
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawFood() {

    for (let i = 0; i < this.menjar.length; i++) {
      this.drawSquare(this.menjar[i].x, this.menjar[i].y, "red");
    }
  }

  collides(x, y) {

    for (let i = 0; i < this.serpiente.length; i++) {
      if (this.serpiente[i].x === x && this.serpiente[i].y === y) {
          return true;
      }
    }

    return false;
  }

  addFood(){

    let x = Math.floor(Math.random() * (this.width / this.amount));
    let y = Math.floor(Math.random() * (this.height / this.amount));

    while (this.collides(x, y)) {
      x = Math.floor(Math.random() * (this.width / this.amount));
      y = Math.floor(Math.random() * (this.height / this.amount));
      }
    this.menjar.push({x, y});
  }



  newTile() {
    let x = this.serpiente[0].x;
    let y = this.serpiente[0].y;
      switch (this.direccion) {
        
        case "right":
          x++;
          break;

        case "left":
          x--;
          break;

        case "up":
          y--;
          break;

        case "down":
          y++;
          break;
      }

      return [x, y];
    }

  step() {
    let newTile = this.newTile();
    let x = newTile[0];
    let y = newTile[1];

    //Si llega a un borde salta una alerta, no he sabido hacer que aparezca en el lado contrario
    // if (x < 0 || x >= this.width / this.amount || y < 0 || y >= this.height / this.amount || this.collides(x, y)) {
    //   alert("Juego acabado Tu puntuacion es: " + this.puntuacion);
    //   clearInterval(this.interval);
    //
    //   return;
    // }
    
    this.serpiente.unshift({x, y});
    
    for (let i = 0; i < this.menjar.length; i++) {
      if (x === this.menjar[i].x && y === this.menjar[i].y) {
        this.menjar.splice(i, 1);
        this.addFood();
        this.puntuacion++;
        break;
      }
      }
    
    if (this.menjar.length === 0) {
      this.addFood();
    }
    
    if (x !== this.menjar[0].x || y !== this.menjar[0].y) {
      this.serpiente.pop();
    }
    

    this.clear();
    this.drawFood();
    this.drawSnake();

  }

    input(e) {
      switch (e.keyCode) {
      case 37:
        if (this.direccion !== "right") {
          this.direccion = "left";
        }
      break;
      case 38:
        if (this.direccion !== "down") {
          this.direccion = "up";
        }
        break;
      case 39:
        if (this.direccion !== "left") {
          this.direccion = "right";
        }
        break;
      case 40:
        if (this.direccion !== "up") {
          this.direccion = "down";
        }
        break;
      }
      }
  
  start() {
    this.initCanvas(this.width, this.height);
    this.serpiente.push({x: this.width / 2 / this.amount, y: this.height / 2 / this.amount});
    this.addFood();
    this.interval = setInterval(() => {
    this.step();
  }, 100);


    document.onkeydown = (e) => {
    this.input(e);
    };
    }
  }
  

  let juego = new Juego(400, 400, 20);// Crea un nou joc
  juego.initCanvas(500, 500);// Posició del canvas
  juego.start(); //Començament



