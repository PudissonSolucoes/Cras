let depValor = document.getElementById("depValor");
let saqValor = document.getElementById("saqValor");

let saldoAtual = 0;


let depositarBtn = document.getElementById("depositarBtn");
let sacarBtn = document.getElementById("sacarBtn");

let saldos = [];
let usuarios = [];
let auxUsuario;

let mudarNome = document.getElementById("mudarNome");
let inSaldoAtual = document.getElementById("inSaldoAtual");


depositarBtn.addEventListener("click", (e) => {
    let valorDepositado = Number(depValor.value);
    if (valorDepositado == null || valorDepositado == 0 || isNaN(valorDepositado)) {
        alert("Valor inválido");
        return;
    } else {

        if (typeof (saldoAtual) == 'string') {

            saldoAtual = Number(saldoAtual);
        }
        saldoAtual = (saldoAtual + valorDepositado).toFixed(2);
        inSaldoAtual.innerText = saldoAtual;
        alert(`Valor depositado!Saldo atual ${saldoAtual}`);
        depValor.value = "";

        saldos[auxUsuario] = saldoAtual;
        localStorage.setItem("saldos", saldos.join(";"));
    }

});

sacarBtn.addEventListener("click", (e) => {
    let valorSacado = saqValor.value;


    if (valorSacado == null || valorSacado == 0 || saldoAtual < 0 || isNaN(valorSacado)) {
        alert("Valor inválido");
        return;
    } else {

        if (typeof (saldoAtual) == 'string') {

            saldoAtual = Number(saldoAtual);
        }
        saldoAtual = (saldoAtual - valorSacado).toFixed(2);
        inSaldoAtual.innerText = saldoAtual;
        alert(`Valor Sacado!Saldo atual ${saldoAtual}`);
        saqValor.value = "";

        saldos[auxUsuario] = saldoAtual;
        localStorage.setItem("saldos", saldos.join(";"));
    }
});


window.addEventListener("load", () => {
    logIn = localStorage.getItem("logIn")
        ? localStorage.getItem("logIn").split(";")
        : [];

    usuarios = localStorage.getItem("usuarios")
        ? localStorage.getItem("usuarios").split(";")
        : [];
    saldos = localStorage.getItem("saldos")
        ? localStorage.getItem("saldos").split(";")
        : [];

    let url = window.location.hash;


    auxUsuario = Number(url.slice(url.indexOf("{") + 1, url.indexOf("}")));

    let nomeUsuario = usuarios[auxUsuario];
    nomeUsuario = nomeUsuario[0].toLocaleUpperCase() +
        nomeUsuario.substring(1, nomeUsuario.length)
    mudarNome.innerText = `Bem vindo ${nomeUsuario}`;


    saldos = localStorage.getItem("saldos")
        ? localStorage.getItem("saldos").split(";")
        : [];

    saldoAtual = saldos[auxUsuario];
    saldoAtual = parseFloat(saldoAtual);

    inSaldoAtual.innerText = saldoAtual;


});