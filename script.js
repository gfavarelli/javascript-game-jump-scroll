let personagem = document.getElementById('personagem');
let personagemBaixo = parseInt(window.getComputedStyle(personagem).getPropertyValue('bottom'));
let personagemDireita = parseInt(window.getComputedStyle(personagem).getPropertyValue('right'));
let personagemLargura = parseInt(window.getComputedStyle(personagem).getPropertyValue('width'));
let chao = document.getElementById('chao');
let chaoBaixo =  parseInt(window.getComputedStyle(chao).getPropertyValue('bottom'));
let chaoAltura = parseInt(window.getComputedStyle(chao).getPropertyValue('height'));
let pular = false;
let tempoAtividade;
let tempoInativo;

let pontosElemento = document.getElementById('pontos');
let pontos = 0;


function pularFunc() {
    if(pular) return;

    tempoAtividade = setInterval(() => {
        
        if (personagemBaixo >= chaoAltura + 250) {
            clearInterval(tempoAtividade);

           voltarAoChaoFunc();
        }

        personagemBaixo+=10;
        personagem.style.bottom = `${personagemBaixo}px`;
        pular = true;
    }, 20);
}

function voltarAoChaoFunc() {
    tempoInativo = setInterval(() => {
        if(personagemBaixo <= chaoAltura + 10) {
            clearInterval(tempoInativo);
            pular = false;
        }

        personagemBaixo -= 10;
        personagem.style.bottom = `${personagemBaixo}px`;
    }, 20);
}

function controle(e) {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        pularFunc();
    }
}

function gerarObstaculo() {
    let obstaculos = document.querySelector('.obstaculos');
    let obstaculo = document.createElement('div');
    obstaculo.setAttribute('class', 'obstaculo');
    obstaculos.appendChild(obstaculo);

    let obstaculoDireita = -30;
    let obstaculoBaixo = 100;
    let obstaculoLargura = 30;
    let obstaculoAltura = Math.floor(Math.random() * 50) + 50;
    
    function moverObstaculo() {
        obstaculoDireita +=5;
        obstaculo.style.right = `${obstaculoDireita}px`;
        obstaculo.style.bottom = `${obstaculoBaixo}px`;
        obstaculo.style.width = `${obstaculoLargura}px`;
        obstaculo.style.height = `${obstaculoAltura}px`;

        if(personagemDireita >= obstaculoDireita - personagemLargura && 
           personagemDireita <= (obstaculoDireita + obstaculoLargura) &&
           personagemBaixo <= obstaculoBaixo + obstaculoAltura) {
            alert('Fim de jogo');
            clearInterval(obstaculoInterval);
            clearTimeout(obstaculoTimeout);
            location.reload();
        }
    }

    let obstaculoInterval = setInterval(moverObstaculo, 20);
    let obstaculoTimeout = setTimeout(gerarObstaculo,1000);
}

function somarPontuacao() {
    pontos++;
    pontosElemento.innerText = pontos;
}

setInterval(somarPontuacao, 100);

document.addEventListener('keydown', controle);

gerarObstaculo();