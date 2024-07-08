class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 60;
    }

    update() {
        // se a raquete é o jogador 
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            if (bola.y < this.y) {
                this.y -= 5;
            } else {
                this.y += 5;
            }

        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > height - this.h) {
            this.y = height - this.h;
        }

    }

    desenha() {
        fill(color(0, 0, 255))
        rect(this.x, this.y, this.w, this.h);
    }
}

class Bola {
    constructor() {
        this.r = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const velocidadeMaxima = 5;
        this.vx = Math.random() * velocidadeMaxima * 2 - velocidadeMaxima;
        this.vy = Math.random() * velocidadeMaxima * 2 - velocidadeMaxima;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.r || this.x > width - this.r) {
            this.reset();
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }

        if (colideRetanguloCirculo(this.x, this.y, this.r, jogador.x, jogador.y, jogador.w, jogador.h) ||
            colideRetanguloCirculo(this.x, this.y, this.r, computador.x, computador.y, computador.w, computador.h)) {
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }

    }

    desenha() {
        fill(color(255, 0, 0))
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

//verifica a colisão entre circulo e retangulo onde circulo é raio e cx, cy e retangulo e x,y,w,h

function colideRetanguloCirculo(cx, cy, raio, x, y, w, h) {
    if (cx + raio < x || cx - raio > x + w) {
        return false;
    }

    if (cy + raio < y || cy - raio > y + h) {
        return false;
    }

    return true;
}

let bola;
let jogador;
let computador;

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30);
    computador = new Raquete(width - 30 - 10);
}

function draw() {
    background(color(0, 0, 0));
    bola.update();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    computador.update();
    computador.desenha();
}