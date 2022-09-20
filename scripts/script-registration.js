const userName = document.getElementById('user-name');
const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');

import {firebaseConfig} from "../modules/firebaseConfig.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
import { collection, doc, setDoc, query, where, getDocs, getDoc} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
const wordsRef = collection(db, "words");


btnAuthenticate.addEventListener('click', compareData);

async function compareData(){

  let userNickNameTrim = userNickName.value.trim()
  let userNameTrim = userName.value.trim()
  let userPasswordTrim = userPassword.value.trim()

  if (userNickNameTrim != "" && userNameTrim != "" && userPasswordTrim != ""){
    const docRef = doc(db, "words", `${userNickNameTrim.toUpperCase()}`);
    try {
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ese usuario ya existe',
        })
      }
      else{
        await setDoc(doc(wordsRef, userNickNameTrim.toUpperCase()), {
          nickname:  `${userNickNameTrim.toUpperCase()}`, 
          nombre: userNameTrim.toUpperCase(), 
          contrasena: userPasswordTrim,
          palabra: ['LAPTOP','HOLA','JUEGO', 'CASA', 'FELIZ', 'ESTUDIO', 'CAMA', 'PUERTA', 'TRABAJO', 'SORPRESA', 'AMOR']
        });
        Swal.fire(
          'Buen trabajo!',
          'Usuario registrado!',
          'success'
        )
        window.open("./user-authentication.html","_self");
      }      
    } 
    catch (error) {
      console.log(error);
    }
  }else{
    console.log('en blanco');
  };
}

user.addEventListener('click', toogleCloseSession);
closeSessionBtn.addEventListener('click',closeSession);

function toogleCloseSession(){
  closeSessionBtn.classList.toggle('inactive');
}

