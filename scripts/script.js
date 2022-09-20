const iniciarJuego = document.querySelector(".btn-begin-game");
const addWord = document.querySelector('.btn-add-word');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');

import { closeSession } from "../modules/close-session.js";
// Primera pagina
// obtencion del usuario

if (!sessionStorage.getItem('usuario')){
    console.log('entro')
    let userData ={
        name: "prueba",
        nickname: "prueba",
        palabra: ""
    }
    let userJSON = JSON.stringify(userData)
    sessionStorage.setItem("usuario", userJSON);

}

let userJsonData = sessionStorage.getItem('usuario');
let userGame = JSON.parse(userJsonData);
user.innerHTML = ` ${userGame.name}`;


iniciarJuego.addEventListener('click',openGame);
user.addEventListener('click', toogleCloseSession);
addWord.addEventListener('click',openNewWord);
closeSessionBtn.addEventListener('click',closeSession);

function openGame(){;
    window.open("./game.html","_self")
}

function openNewWord(){
    window.open('./new_word.html','_self')
}

function toogleCloseSession(){
    closeSessionBtn.classList.toggle('inactive');
}

