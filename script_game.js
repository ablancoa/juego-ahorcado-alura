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

{/* <div class="input-container">
            <input type="text" class="input" maxlength="1"">
            <input type="text" class="input" maxlength="1"">
            <input type="text" class="input" maxlength="1"">
            <input type="text" class="input" maxlength="1"">
            <input type="text" class="input" maxlength="1"">
            <input type="text" class="input" maxlength="1"">
</div> */}

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
    console.log(String.fromCharCode(event.keyCode));
}