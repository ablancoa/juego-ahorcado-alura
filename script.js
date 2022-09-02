const iniciarJuego = document.querySelector(".btn-begin-game");

iniciarJuego.addEventListener('click',abrirJuego);

function abrirJuego(){
    window.open("./game.html","_self")
}