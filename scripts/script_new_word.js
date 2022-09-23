const inputNewWord = document.querySelector('#new-word-input');
const buttonNewWord = document.querySelector('#add-new-word');
const inputFastWord = document.querySelector('#new-fast-word');
const buttonFastGame = document.querySelector('#new-fast-game');
const goToGame = document.querySelector('.goToGame');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');
const personalLibrery = document.querySelector('#biblio-personal');
const imgAvatar = document.getElementById('avatar');
const userContainer = document.getElementById('user-container');
const returnBtn = document.querySelector('.return-icon');

// obtencion del usuario
let userJsonData = sessionStorage.getItem('usuario');
let userGame = JSON.parse(userJsonData);
console.log(userGame);
user.innerHTML = `Usuario: ${userGame.name}`;
imgAvatar.setAttribute('src',userGame.urlImg);

// Ocultar la seccion de libreria personal si no esta registrado
if ( userGame.nickname == "prueba"){
  personalLibrery.style.display = "none"
}

// BTN DE SECCION
import { closeSession } from "../modules/close-session.js";
userContainer.addEventListener('click', toogleCloseSession);
closeSessionBtn.addEventListener('click',closeSession);
function toogleCloseSession(){
  closeSessionBtn.classList.toggle('inactive');
}




// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
import {firebaseConfig} from "../modules/firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Eventos y constantes del database
const docRef = doc(db, "words", `${userGame.nickname}`);
let docSnap = await getDoc(docRef);
buttonNewWord.addEventListener('click',actualizarData);
buttonFastGame.addEventListener('click',startFastGame);
goToGame.addEventListener('click', () => {window.open("./game.html","_self")});
returnBtn.addEventListener('click', () => {window.open("./index.html","_self")});

// Consulta a la base de datos
const wordsRef = collection(db, "words")


// PARA ACTUALIZAR LA BASE DE DATOS
function actualizarData (){
  let a = inputNewWord.value.toUpperCase();
  if (inputNewWord.value != "" && inputNewWord.value != " ") {
    if (!inputNewWord.checkValidity()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se pueden insertar letras',
      })
    }
    else{
      try {
        updateDoc(docRef, {
          palabra: arrayUnion(a)
        })
        Swal.fire(
          'Buen trabajo!',
          'La palabra ha sido agregada!',
          'Exito'
        )
        inputNewWord.value ="";
      }catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        console.error("Error adding document: ", e);
      }
    }
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Solo se pueden insertar letras',
    })
  }
  
}

// Para juego rapido
console.log(docSnap.data());
function startFastGame() {
  debugger
  if(inputFastWord.value != "" && inputFastWord.value != " "){
    if(!inputFastWord.checkValidity()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se pueden insertar letras',
      })
    } else {
      let userData = {
        name: (docSnap.data()).nombre,
        nickname: (docSnap.data()).nickname,
        palabra: inputFastWord.value.toUpperCase(),
        urlImg : userGame.urlImg
      }
      console.log(userData);
      let userJSON = JSON.stringify(userData)
      sessionStorage.setItem("usuario", userJSON);

      Swal.fire(
        'Buen trabajo!',
        'La palabra ha sido agregada, ya puede ir al juego!',
        'Exito'
      )
      inputFastWord.value = "";
    }
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No puede ingresar espacios',
    })
  }
  
}
  


//-----------------------------------------Codigo de referencia------------------------------------------------------

// // Add a new document in collection "cities" Metodo para verificar si existe y modificarlo. Sino crear uno nuevo
// function addWord () {
//   setDoc(doc(db, "words", "prueba"), {
//     palabra: arrayBase,
// });
// }

// // Para obtener los datos de la bd Coleccion words, documentID prueba
// let docSnap = await getDoc(docRef);
// function descargarData () {
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data().palabra);
//     arrayBase = docSnap.data().palabra;
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }

// }


// //PARA RECORRER TODOS LOS ELEMENTOS DEL OBJETO EN EL DB
// const querySnapshot = await getDocs(collection(db, "words")); // El await es una promesa y solo se utiliza en el scope global 
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
//   arrayBase.push(doc.id);

// });

// //Este metodo es para que siempre inserte el dato sin verificar si existe
// try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Alan",
//       middle: "Mathison",
//       last: "Turing",
//       born: 1912
//     });
  
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
// }