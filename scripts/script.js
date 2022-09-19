const iniciarJuego = document.querySelector(".btn-begin-game");
const addWord = document.querySelector('.btn-add-word');

// Primera pagina

iniciarJuego.addEventListener('click',openGame);
addWord.addEventListener('click',openNewWord);

function openGame(){
    window.open("./game.html","_self")
}

function openNewWord(){
    window.open('./new_word.html','_self')
}