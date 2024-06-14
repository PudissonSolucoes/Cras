let inLogin = document.getElementById("inLogin");
let inSenha = document.getElementById("inSenha");
let logarBtn = document.getElementById("logarBtn");

let logIn;
let emails = [];
let senhas = [];

let login;
let senha;
let aux;

logarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    login = inLogin.value;
    senha = inSenha.value;

    for (i = 0; i < emails.length; i++) {
        if (emails[i] == login) {

            aux = i;
        }
    }
    if (senha == senhas[aux]) {
        alert('Logado com sucesso!');
        logIn = 'true+' +  aux;
        localStorage.setItem("logIn", logIn);
    
        window.location = "logado.html#"  + "{" + aux + "}";
    } else {
        alert('Dados incorretos!');
        inLogin.value = "";
        inSenha.value = "";
    }
});
window.addEventListener("load", () => {
    emails = localStorage.getItem("emails")
        ? localStorage.getItem("emails").split(";")
        : [];

    senhas = localStorage.getItem("senhas")
        ? localStorage.getItem("senhas").split(";")
        : [];
  
    logIn = localStorage.getItem("logIn")
        ? localStorage.getItem("logIn").split(";")
        : [];

});