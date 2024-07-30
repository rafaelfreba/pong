let bolaImagem;
let jogadorImagem;
let computadorImagem;
let fundoImagem;
let colisao;
let ponto;
let pontosJogador = 0;
let pontosComputador = 0;


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
        //se a raquete é o jogador 
        if (this.x < width / 2) {
            image(jogadorImagem, this.x, this.y, this.w, this.h)
        } else {
            image(computadorImagem, this.x, this.y, this.w, this.h)
        }
    }
}

class Bola {
    constructor() {
        this.r = 12;
        this.reset();
        this.angulo = 0;

    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const velocidadeMaxima = 5;
        this.vx = Math.random() * velocidadeMaxima * 2 - velocidadeMaxima;
        this.vy = Math.random() * velocidadeMaxima * 2 - velocidadeMaxima;
        this.angulo = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angulo += Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 30;

        if (this.x < this.r || this.x > width - this.r) {
            if(this.x < this.r){
                pontosComputador++;
            } else {
                pontosJogador++;
            }
            golSom.play();
            falaPontos();
            this.reset();            
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }

        if (colideRetanguloCirculo(this.x, this.y, this.r, jogador.x, jogador.y, jogador.w, jogador.h) ||
            colideRetanguloCirculo(this.x, this.y, this.r, computador.x, computador.y, computador.w, computador.h)) {
            quicarSom.play();
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }

    }

    desenha() {
        push();
        translate(this.x, this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(bolaImagem, 0, 0, this.r * 2, this.r * 2);
        pop();
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

function falaPontos(){
    const synth = window.speechSynthesis;
    const texto = `Pontuação: ${pontosJogador} a ${pontosComputador}`;
    const utterance = new SpeechSynthesisUtterance(texto);
    synth.speak(utterance);  
}

function preload(){
    bolaImagem = loadImage('bola.png');
    jogadorImagem = loadImage('barra01.png');
    computadorImagem = loadImage('barra02.png');
    fundoImagem = loadImage('fundo1.png');
    quicarSom = loadSound('colisao.wav');
    golSom = loadSound('ponto.wav');
}

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30);
    computador = new Raquete(width - 30 - 10);
}

function draw() {
    let canvasAspectRatio = width / height;
    let fundoAspectRatio = fundoImagem.width / fundoImagem.height;
    let zoom = 1;
    if (canvasAspectRatio > fundoAspectRatio) {
        zoom = width / fundoImagem.width;
    } else {
        zoom = height / fundoImagem.height;
    }
    let scaledWidth = fundoImagem.width * zoom;
    let scaledHeight = fundoImagem.height * zoom;
    image(fundoImagem, (width - scaledWidth) / 2, (height - scaledHeight) / 2, scaledWidth, scaledHeight);    

    bola.update();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    computador.update();
    computador.desenha();
}