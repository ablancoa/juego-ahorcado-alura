// Pagina del juego
const newGame = document.querySelector('.btn-new-game');
const inputContainer = document.querySelector('.input-container');

newGame.addEventListener('click',selectWord);

const arraySecretWords = ["hola","programa","laptop","codigo"];
function selectWord(){
    let secretWord = arraySecretWords[Math.floor(Math.random()*4)];
    console.log(secretWord);
    createLines(secretWord);
}

function createLines(palabra){
    let cantidad = Array.from(palabra);
    cantidad.forEach(element => {
        const letra = document.createElement('p')
        letra.setAttribute('id',element);
        letra.classList.add('input')

        inputContainer.appendChild(letra);
    });

    
}

let keyword = window.addEventListener('keypress', capturarLetra);

function capturarLetra(event){
    let captura = (String.fromCharCode(event.keyCode));
    let nuemros = ["1","2","3","4","5","6","7","8","9","0"]
    if (captura == (nuemros.find(element => element == captura))){
        console.log("Solo debe ingresar letras");
    }
    else if(typeof captura === 'string') {
        console.log(captura);
    }
}