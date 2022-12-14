// Pagina del juego
const newGame = document.querySelector('.btn-new-game');
const inputContainer = document.querySelector('.input-container');
const errorEntrado = document.querySelector('.letter-mistakes');
const desistir = document.querySelector('.btn-surrender');
let idImagenes = document.getElementsByClassName('munheco');
const agregarPalabra = document.querySelector('.icon-btn');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');
const imgAvatar = document.getElementById('avatar');
const userContainer = document.getElementById('user-container');
const returnBtn = document.querySelector('.return-icon');


// obtencion del usuario
let userJsonData = sessionStorage.getItem('usuario');
let userGame = JSON.parse(userJsonData);
user.innerHTML = `Usuario: ${userGame.name}` || "prueba";
imgAvatar.setAttribute('src',userGame.urlImg);

//------------------------------------------------------------------------------------------------------------
// Cargando array de palabras en modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

import {firebaseConfig} from "../modules/firebaseConfig.js"
import { closeSession } from "../modules/close-session.js";
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const docRef = doc(db, "words", `${userGame.nickname}`);
const docSnap = await getDoc(docRef);

let arrayDB = function () { //Array con todas las palabras
    let dataArray;
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().palabra);
        dataArray = docSnap.data().palabra;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return dataArray;
  
}


//----------------------------------------------------------------------------------------------------------------------

let arrayWord =[]; //Array de la palabra a adivinar
let secretWord;
const letrasErrada = []; //Letras equivocadas
let letrasAcertadas = 0;
let erroresCometidos = 0;
let endGame;


desistir.addEventListener('click',clear);
agregarPalabra.addEventListener('click',() => {window.open("./new_word.html","_self")})
returnBtn.addEventListener('click', () => {
    clear();
    window.open("./index.html","_self")
});
newGame.addEventListener('click',selectWord); //iniciar juego
userContainer.addEventListener('click', toogleCloseSession);
closeSessionBtn.addEventListener('click',closeSession);
window.addEventListener('keypress', capturarLetra);


// Elegir variable al azar
let arrayDBlarge = arrayDB().length
let fastWordStorage = userGame.palabra;

// Para saber si es juego rapido o no
function isSessionStorageEmpty(){
    if(fastWordStorage != ""){ // 
        console.log(fastWordStorage);
        secretWord = fastWordStorage;
        arrayWord = startNewGame(secretWord);
        sessionStorage.setItem("fastWord", "");
    }
}

let userData;
// para iniciar un juego nuevo 
async function selectWord(){
    let BD = await arrayDB();
    secretWord = BD[Math.floor(Math.random()*arrayDBlarge)]  
    arrayWord = startNewGame(secretWord);
    userData = {
        name: userGame.name,
        nickname: userGame.nickname,
        palabra: "",
        urlImg : userGame.urlImg
    }
    console.log(userData.nickname);
    let userJSON = JSON.stringify(userData)
    sessionStorage.setItem("usuario", userJSON); 
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
;

// Funcion de crear las letras
function startNewGame(palabra){
    clear();
    endGame = false;
    crearTeclado();
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
    // Para limpiar el mu??eco
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
    idValue.forEach(element => {
        elementErase = document.getElementById(element);
        inputContainer.removeChild(elementErase)
    })
    // Para limpiar las letras equivocadas de pantalla
    let letrasErase = document.getElementsByClassName('letters')

    while (letrasErase[0]){
        letrasErase[0].parentNode.removeChild(letrasErase[0]);
    }
    // Para limpiar el fastWord
    fastWordStorage = "";
    letrasAcertadas = 0;
}

function crearTeclado() {

    const letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","??","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
    
    letras.forEach(element => {
        const letraTeclado = document.createElement('p')
        letraTeclado.setAttribute('id',element);
        letraTeclado.classList.add('letters')
        letraTeclado.innerText = element
        errorEntrado.appendChild(letraTeclado);
        
    })
    document.querySelectorAll(".letters").forEach(el => {
        el.addEventListener("click", e => {
            const id = e.target.getAttribute("id");
            verifyIsLetraExist(id);
        });
    })      
}

function verifyIsLetraExist(letra) {
    if (endGame == false){ 
        let compareId = idLetras();
        let valueInput;
        let letraYaIngresada = document.getElementById(letra);
        letraYaIngresada.classList.add('block-letter')
        if (letrasErrada.includes(letra)){
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: `Letra ya insertada`,
            }) 
        }
        else{
            //Letra errada ya ingresada
            if (arrayWord.includes(letra)){
                for (let i = 0; i < arrayWord.length; i++){
                    if (letra == arrayWord[i]){
                        valueInput = document.getElementById(compareId[i]);
                        valueInput.innerText = letra;
                        letrasAcertadas++
                        if (letrasAcertadas == idLetras().length){
                            Swal.fire(
                                'Buen trabajo!',
                                'Usted gan??!',
                                'Exito'
                            )
                            endGame = true;
                        }
                        
                    }
                }
                letrasErrada.push(letra);
            } 
            else{
                letrasErrada.push(letra) //Ingresar nueva letra errada
                erroresCometidos++    
                if(erroresCometidos != idImagenes.length){
                    idImagenes[erroresCometidos-1].classList.remove('inactive')
                }
                else if(erroresCometidos == idImagenes.length){
                    idImagenes[erroresCometidos-1].classList.remove('inactive')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Usted perdio, la palabra era ${secretWord}`,
                    })
                    endGame = true;
                }
            }
        }
        console.log(userGame);
    }
    else{
        return;
    }
}


function capturarLetra(event){
    if (arrayWord.length == 0){
        alert("Inicie juego nuevo")
    }
    else{

        if (event.keyCode == 13){ //Evitar la funcion del enter
            event.preventDefault();
        }
        else{
            let capturaLetra = String.fromCharCode(event.keyCode);
            let captura = capturaLetra.toUpperCase()
            let nuemros = ["1","2","3","4","5","6","7","8","9","0"]
            if (captura == (nuemros.find(element => element == captura))){ //Comprobar que no se entren numeros
                alert("Solo debe ingresar letras");
            }
            else if (captura == " " || captura == ""){ //Evitar que no se entren espacios
                newGame.blur();  
            }
            else if(typeof captura === 'string') { 
                verifyIsLetraExist(captura);
            }
        }
        
    }
        
}

function toogleCloseSession(){
    closeSessionBtn.classList.toggle('inactive');
}
// Activar botones despues de cargar BD
isSessionStorageEmpty();
newGame.classList.remove('inactive');
desistir.classList.remove('inactive');
