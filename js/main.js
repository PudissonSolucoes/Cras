let apostar = document.getElementById("apostar");
let resgatar = document.getElementById("resgatar");
let cadastrar = document.getElementById("cadastrar");

let inValor = document.getElementById("inValor");
let inSaldo = document.getElementById("inSaldo");
let mult1 = document.getElementById("mult1");
let mult2 = document.getElementById("mult2");
let mult3 = document.getElementById("mult3");
let multiplicadores = [0, 0, 0];

let tentativas = 3;

let saldoFicticio = 50;
let valorApostado;
let pararValidacao = false;

let url = window.location.href;
const contem = url.includes("logado");

// var logIn;

apostar.addEventListener("click", (e) => {
  valorApostado = inValor.value;
 
  validacoes(valorApostado);

  if (pararValidacao == true) {
    return;
  }

  if (contem == false) {
    tentativas--;
    alert(`Você tem mais ${tentativas} tentativas`);
  }

  inValor.value = "";
  statusDinheiro.innerText = "SUBINDO...";

  if (contem == false) {
    saldoFicticio = saldoFicticio - valorApostado
    inSaldo.innerText = saldoFicticio.toFixed(2);
  } else {
    saldoAtual = saldoAtual - valorApostado;
    inSaldoAtual.innerText = saldoAtual.toFixed(2);
    saldos[auxUsuario] = saldoAtual.toFixed(2);
    localStorage.setItem("saldos", saldos.join(";"));
  }


  apostado(valorApostado);
  resgatar.disabled = false;
  apostar.disabled = true;

});

const validacoes = (valorApostado) => {


  if (valorApostado == "") {
    alert("Preenha o campo com valor!");
    pararValidacao = true;
    return;
  }

  if (contem == false) {
    if (valorApostado > saldoFicticio) {
      alert("Valor a mais!");
      pararValidacao = true;
      return;
    }
  } else {
    if (Number(valorApostado) > Number(saldoAtual)) {
      alert("Valor a mais!");
      pararValidacao = true;
      return;
    }

    if (valorApostado.indexOf('.') != -1) {

      let numeroCorrigido;
      let numeroInteiro;
      let depoisVirgula;

      let indexPonto = valorApostado.indexOf('.');
      numeroInteiro = valorApostado.substring(0, indexPonto);


      depoisVirgula = valorApostado.substring(indexPonto + 1, indexPonto + 3)

      numeroCorrigido = numeroInteiro + "." + valorApostado.substring(0,
        indexPonto - 1);
      numeroCorrigido = numeroInteiro + '.' + depoisVirgula;

      valorApostado = numeroCorrigido;
    }

  }



  if (tentativas <= 0) {
    alert("Acabou as tentativas");
    resgatar.disabled = true;
    apostar.disabled = true;
    pararValidacao = true;
    return;
  }
  if (isNaN(valorApostado)) {
    alert("Digite um número válido\n.(ponto) em vez de ,(vírgula)talvez?");
    pararValidacao = true;
    return;
  }
  if (saldoFicticio <= 0) {
    alert('SEM SALDO!');
    pararValidacao = true;
    return;
  }
  pararValidacao = false;
};

resgatar.addEventListener("click", (e) => {
  resgatou();
});

function resgatou() {

  clearInterval(animationInterval);
  clearInterval(multiplicadorInterval);
  let valorGanho = valorApostado * multiplicador;
  alert(`Você Resgatou "${multiplicador.toFixed(2)}" x ${valorApostado}
        \nVocê ganhou: ${valorGanho.toFixed(2)}`);

  if (contem == false) {
    saldoFicticio = saldoFicticio + valorGanho;
    inSaldo.innerText = saldoFicticio.toFixed(2);
  } else {
    saldoAtual = saldoAtual + valorGanho;
    inSaldoAtual.innerText = saldoAtual.toFixed(2);
    saldos[auxUsuario] = saldoAtual.toFixed(2);
    localStorage.setItem("saldos", saldos.join(";"));
  }

  statusDinheiro.innerText = "Parado";
  valorGanhado.innerHTML = '0';
  mudarMultiplicadores();
  tempo = 1;
  draw();
  travarPassaro = false;
  resgatar.disabled = true;
  apostar.disabled = false;
}


const mudarMultiplicadores = () => {
  multiplicadores.unshift(multiplicador);
  mult1.innerText = multiplicadores[0].toFixed(2) + ' x';
  mult2.innerText = multiplicadores[1].toFixed(2) + 'x';
  mult3.innerText = multiplicadores[2].toFixed(2) + 'x';
}

