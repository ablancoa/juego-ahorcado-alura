// Pagina del juego
const newGame = document.querySelector('.btn-new-game');
const inputContainer = document.querySelector('.input-container');
const errorEntrado = document.querySelector('.letter-mistakes');
const desistir = document.querySelector('.btn-surrender');
let idImagenes = document.getElementsByClassName('munheco');

// Cargando array de palabras en modules
import { arraySecretWords }  from './modules/palabras.js';

let keyword = window.addEventListener('keypress', capturarLetra);
const letrasErrada = [];
let erroresCometidos = 0;

newGame.addEventListener('click',selectWord);
desistir.addEventListener('click',clear);


// Elegir variable al azar

let arrayWord =[];
let secretWord;

function selectWord(){
    secretWord = arraySecretWords[Math.floor(Math.random()*4)];
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
    // Para limpiar el muñeco
    while (erroresCometidos != 0){
        idImagenes[erroresCometidos-1].classList.add('inactive')
        erroresCometidos--
    }
    // Para limpiar el array letrasErradas
    while (letrasErrada[0]){
        letrasErrada.pop()
    }
    // Para limpiar las letras correctas en pantalla
    let elementErase;
    let idValue = idLetras();
    console.log(idValue);
    idValue.forEach(element => {
        elementErase = document.getElementById(element);
        inputContainer.removeChild(elementErase)
    })
    // Para limpiar las letras equivocadas de pantalla
    let letrasErase = document.getElementsByClassName('letters')
    console.log(letrasErase);
    while (letrasErase[0]){
        letrasErase[0].parentNode.removeChild(letrasErase[0]);
    }
}



function capturarLetra(event){
    if (arrayWord.length == 0){
        alert("Inicie juego nuevo")
    }
    else{

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
                    erroresCometidos++    
                    if(erroresCometidos != idImagenes.length){
                        idImagenes[erroresCometidos-1].classList.remove('inactive')
                    }
                    else if(erroresCometidos == idImagenes.length){
                        idImagenes[erroresCometidos-1].classList.remove('inactive')
                        alert(`Usted perdio la palabra era ${secretWord}`)  
                    }
                }
            }
        }
        
    }
        
}}