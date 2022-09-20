const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');

import {firebaseConfig} from "../modules/firebaseConfig.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { closeSession } from "../modules/close-session.js";

// obtencion del usuario
let userJsonData = sessionStorage.getItem('usuario');
let userGame = JSON.parse(userJsonData);
user.innerHTML = ` ${userGame.name}`;

console.log(userGame);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
import { collection, doc, setDoc, query, where, getDocs, getDoc} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
const wordsRef = collection(db, "words");

btnAuthenticate.addEventListener('click', authenticate);
let userData;

// funcion para autenticar al usuario
async function authenticate (){
    let userNickNameTrim = userNickName.value.trim();
    let userPasswordTrim = userPassword.value.trim();
    if (userNickNameTrim != "" && userPasswordTrim != "" && userGame.nickname != userNickNameTrim.toUpperCase()){
      console.log(userGame.nickname.toUpperCase())
        const docRef = doc(db, "words", `${userNickNameTrim.toUpperCase()}`);
        try {
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            Swal.fire(
                'Buen trabajo!',
                'Usuario verificado!',
                'success'
            )
            userData = {
                name: (docSnap.data()).nombre,
                nickname: (docSnap.data()).nickname,
                palabra: ""
            }
            window.open("./index.html","_self");

            let userJSON = JSON.stringify(userData)
            sessionStorage.setItem("usuario", userJSON);
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario no encontrado',
            })
          }; 
        }
        catch (error) {
          console.log(error);
        }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Rellene los campos o cierre sesión',
      })
      console.log('en blanco');
    };
}

// Me permite mostrar y ocultar el cerrar sesion
user.addEventListener('click', toogleCloseSession);
closeSessionBtn.addEventListener('click',closeSession);

function toogleCloseSession(){
  closeSessionBtn.classList.toggle('inactive');
}
