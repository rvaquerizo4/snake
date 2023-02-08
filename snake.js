class Juego{

    constructor(ancho, alto, amount) {
      this.ancho = ancho;
      this.alto = alto;
      this.amount = amount;
      this.serp = [];
      this.direccion = "right";
      this.Menjar = [];
      this.puntuacion = 0;

    }
  

    initCanvas(ancho, alto){
      this.canvas = document.createElement("canvas");
      this.canvas.width = ancho;
      this.canvas.height = alto;
      this.context = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);

      return this;
    }
  
    start() {
      for (let a = this.amount / 2; a < this.amount / 2 + 3; a++) {
          this.serp.push({ x: a, y: this.amount / 2 });
      }

      this.addMenjar();
      this.step();
      this.initCanvas(200, 100);
    }
  
    drawSquare(x, y, color) {
      this.context.fillStyle = color;
      this.context.fillRect(
        x * this.ancho / this.amount,
        y * this.alto / this.amount,
        this.ancho / this.amount,
        this.alto / this.amount
      );
    }
  
    drawserp() {
      this.serp.forEach(part => {
        this.drawSquare(part.x, part.y, "black");
      });
    }
  
    clear() {
      this.context.clearRect(0, 0, this.ancho, this.alto);
    }
  
    drawMenjar() {
      this.Menjar.forEach(part => {
        this.drawSquare(part.x, part.y, "red");
      });
    }
  
    collides(x, y) {
      return this.serp.some(part => part.x === x && part.y === y);
    }
  
    addMenjar() {
      let x = Math.floor(Math.random() * this.amount);
      let y = Math.floor(Math.random() * this.amount);
      
      
      while (this.collides(x, y)) {
        x = Math.floor(Math.random() * this.amount);
        y = Math.floor(Math.random() * this.amount);
      }
      this.Menjar.push({ x, y });
    }
  
    nuevoTile() {
      let nuevoX = this.serp[0].x + (this.direccion === "right" ? 1 : this.direccion === "left" ? -1 : 0);
      let nuevoY = this.serp[0].y + (this.direccion === "down" ? 1 : this.direccion === "up" ? -1 : 0);
        
      if (nuevoX >= this.amount) {
          nuevoX = 0;
        }
        if (nuevoX < 0) {
          nuevoX = this.amount - 1;
        }
        if (nuevoY >= this.amount) {
          nuevoY = 0;
        }
        if (nuevoY < 0) {
          nuevoY = this.amount - 1;
        }
        
        return [nuevoX, nuevoY];
    }
  
    step() {
        let nuevoTile = this.nuevoTile();
        if (this.collides(nuevoTile[0], nuevoTile[1])) {
          return;
          }
        

        this.serp.unshift(nuevoTile);
        this.serp.pop();
      
          if (nuevoTile[0] === this.Menjar[0] && nuevoTile[1] === this.Menjar[1]) {
            this.addMenjar();
          } 
          else {
            this.clear();
          }
      
        this.drawMenjar();
        this.drawserp();
      };

      input(e){
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
      
      
    }


const juego1 = new Juego(500, 500, 20);
juego1.initCanvas(500, 500);
juego1.start();

document.addEventListener("keydown", function(e) {
  juego1.input(e);
});

setInterval(function() {
  juego1.step();
}, 100);

//let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = juego1.input.bind(juego1); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(juego1.step.bind(juego1),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
