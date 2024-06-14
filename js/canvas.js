
let animationInterval;
let trocarImagem;
let pixelPular;
let xPassaro;
let yPassaro;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const valorGanhado = document.getElementById("valorGanhado");

let crash;

let multiplicador = 0;
let tempo = 1;
let travarPassaro = false;

function draw() {
    //limparAnteriores
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500);
    xPassaro = 175;
    yPassaro = 250;
    pixelPular = 5;
    trocarImagem = 1;
    multiplicador = 0;
    //X e Y FLECHAS
    for (i = 1; i < 20; i++) {
        canvas_arrow(ctx, 100 + i, 375 + i, 100 + i, 50 + i);
    }
    for (i = 1; i < 20; i++) {
        canvas_arrow(ctx, 100 + i, 375 + i, 400 + i, 375 + i);
    }

    ctx.strokeStyle = "rgb(64, 143, 221)";
    ctx.stroke();

    // LETRAS EM BAIXO TEMPO
    ctx.font = "25px serif";
    ctx.fillStyle = "rgb(71, 205, 0)";
    ctx.fillText("1 s", 150, 425);
    ctx.fillText("2 s", 225, 425);
    ctx.fillText("3 s", 300, 425);

    // Velocidade

    ctx.font = "bold 50px verdana, sans-serif";
    ctx.fillStyle = "rgb(71, 205, 0)";
    ctx.fillText("0.0 " + " x", 150, 125);

    botarImagem('img/frames/frame0.png', xPassaro, yPassaro, ctx);
    botarImagem('img/estilingue.png', 125, 300, ctx);



    function canvas_arrow(context, fromx, fromy, tox, toy) {
        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    }
}

function botarImagem(imagem, x, y, ctx) {
    base_image = new Image();
    base_image.src = imagem;
    ctx.drawImage(base_image, x, y);//X,Y,TAMANHOS

}
const apostado = () => {
    animationInterval = setInterval(animacaoPassaro, 100);
    multiplicadorInterval = setInterval(animacaoMultiplicador, 1000);


    function animacaoPassaro() {
    
        let nomeImagem = 'img/frames/frame' + trocarImagem + '.png';
        trocarImagem++;

        ctx.fillStyle = 'black';
        ctx.fillRect(175, 150, 250, 200); //apagar
        xPassaro = xPassaro + pixelPular;
        yPassaro = yPassaro - pixelPular;

        if (travarPassaro == true) {
            xPassaro = 280;
            yPassaro = 145;
        }
        botarImagem(nomeImagem, xPassaro, yPassaro, ctx);

        pixelPular = pixelPular + 5;
        if (trocarImagem > 12) {
            trocarImagem = 1;
        }
        if (xPassaro >= 300 || yPassaro <= 145) {

            travarPassaro = true;
        }
    }

    function animacaoMultiplicador() {
        if(contem == false){
            crash = Math.floor(Math.random() * 30);
        }else{
            crash = Math.floor(Math.random() * 20);
        }
       

        if (crash == 0) {
            alert("Estourou!\nAposta perdida!");
            statusDinheiro.innerText = "Parado";
            valorGanhado.innerHTML = '0';
            resgatar.disabled = true;
            apostar.disabled = false;
            multiplicador = 0;
            draw();
            travarPassaro = false;
            mudarMultiplicadores();
            clearInterval(animationInterval);
            clearInterval(multiplicadorInterval);
        } else {
            //apagar multiplicador
            ctx.fillStyle = 'black';
            ctx.fillRect(150, 75, 300, 65);

            //fazer novo multiplicador
            ctx.font = "bold 50px verdana, sans-serif";
            ctx.fillStyle = "rgb(71, 205, 0)";
            multiplicador = multiplicador + 0.2;
            ctx.fillText(multiplicador.toFixed(2) + " x", 150, 125);


            ctx.fillStyle = 'black';
            ctx.fillRect(150, 400, 300, 65);

            ctx.font = "25px serif";
            ctx.fillStyle = "rgb(71, 205, 0)";
            ctx.fillText(tempo + ' s', 150, 425);
            ctx.fillText(tempo + 1 + " s", 225, 425);
            ctx.fillText(tempo + 2 + " s", 300, 425);
            tempo++;
            valorGanhado.innerHTML = `R$${(multiplicador * valorApostado).toFixed(2)}`;
        }

    }
}


window.onload = function (e) {
    draw();
   
}   