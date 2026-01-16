let listaNumeroAlGerado = [];
let qtdMaximaNumeros = 100;
let numeroSecretoGerado = gerarNumeroAleatorio();
//console.log(numeroSecretoGerado);
let tentativas = 1;

function textoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function mensagemInicial() {
    let msgmInicial = `Escolha um número entre 1 e ${qtdMaximaNumeros}`;
    textoNaTela('h1', 'Jogo do número secreto');
    textoNaTela('p', msgmInicial);
}
mensagemInicial();

function verificarChute() {
    let chuteDado = document.querySelector('input').value;

    if (chuteDado == numeroSecretoGerado) {
        textoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        textoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chuteDado > numeroSecretoGerado) {
            textoNaTela('p', 'O numero secreto é menor');
        } else {
            textoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * qtdMaximaNumeros + 1);
    let qtdElementoLista = listaNumeroAlGerado.length;

    if (qtdElementoLista == qtdMaximaNumeros) {
        listaNumeroAlGerado = [];
    }

    if (listaNumeroAlGerado.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumeroAlGerado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chuteDado = document.querySelector('input');
    chuteDado.value = '';
}
function reiniciarJogo() {
    numeroSecretoGerado = gerarNumeroAleatorio();
    console.log(numeroSecretoGerado);
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}