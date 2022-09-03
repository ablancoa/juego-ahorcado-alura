// Pagina del juego
const newGame = document.querySelector('.btn-new-game');
const inputContainer = document.querySelector('.input-container');
const errorEntrado = document.querySelector('.letter-mistakes');

newGame.addEventListener('click',selectWord);


// Elegir variable al azar
const arraySecretWords = ["hola","programa","laptop","codigo"];
let arrayWord =[];

function selectWord(){
    let secretWord = arraySecretWords[Math.floor(Math.random()*4)];
    console.log(secretWord);
    arrayWord = startNewGame(secretWord);
}

// Array con los id de todas las letras
let idLetras = function(){
    let letras = document.getElementsByClassName('input');
    let objectLetras = Object.values(letras);
    let arrayId =[];
    objectLetras.map( element => {
        arrayId.push(element.id)
    });
    return arrayId
    
}

// Funcion de crear las letras
function startNewGame(palabra){
    clear()
    let cantidad = Array.from(palabra);
    let id = 0;
    cantidad.forEach(element => {
        const letra = document.createElement('p')
        letra.setAttribute('id',`l${id}`);
        letra.classList.add('input')
        inputContainer.appendChild(letra);
        id = id + 1
    });
    return cantidad;

}

// Funcion de limpiar pantalla
function clear() {
    let elementErase;
    let idValue = idLetras();
    console.log(idValue);
    idValue.forEach(element => {
        elementErase = document.getElementById(element);
        inputContainer.removeChild(elementErase)
    })
    let letrasErase = document.getElementsByClassName('letters')
    console.log(letrasErase);
    while (letrasErase[0]){
        letrasErase[0].parentNode.removeChild(letrasErase[0]);
    }
}


let keyword = window.addEventListener('keypress', capturarLetra);
const letrasErrada = [];

function capturarLetra(event){
    if (event.keyCode == 13){
        event.preventDefault();
    }
    else{
        let captura = String.fromCharCode(event.keyCode);
        let nuemros = ["1","2","3","4","5","6","7","8","9","0"]
        if (captura == (nuemros.find(element => element == captura))){
            alert("Solo debe ingresar letras");
        }
        else if (captura == " " || captura == ""){
            newGame.blur();  
        }
        else if(typeof captura === 'string') {
            let compareId = idLetras();
            let valueInput; 
            if (arrayWord.includes(captura))
            for (let i = 0; i < arrayWord.length; i++){
                if (captura == arrayWord[i]){
                    valueInput = document.getElementById(compareId[i]);
                    valueInput.innerText = captura;
                }
            }
            else{
                console.log(letrasErrada);
                if (letrasErrada.includes(captura)){
                    alert("Esa letra ya fue ingresada")
                }
                else{
                    letrasErrada.push(captura)
                    const errorLetra = document.createElement('p');
                    errorLetra.classList.add('letters');
                    errorEntrado.appendChild(errorLetra)
                    errorLetra.innerText = captura;
                }
            }
        }

    }
    
}