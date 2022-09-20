const userName = document.getElementById('user-name');
const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');
const user = document.getElementById('user-nick-name');
const avatares = document.querySelectorAll('.avatares-registration');
const returnBtn = document.querySelector('.return-icon');

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
returnBtn.addEventListener('click', () => {window.open("./user-authentication.html","_self")});

async function compareData(){

  let userNickNameTrim = userNickName.value.trim()
  let userNameTrim = userName.value.trim()
  let userPasswordTrim = userPassword.value.trim()
  let srcImg = () => {
    console.log(antiguoId)
    let src = document.getElementById(antiguoId);
    let atributo = src.getAttribute('src')
    return atributo;
  }
  console.log(avataresId());

  if (userNickNameTrim != "" && userNameTrim != "" && userPasswordTrim != "" && avataresId() != "prueba"){
    const docRef = doc(db, "words", `${userNickNameTrim.toUpperCase()}`);
    try {
      // evalua si el usuario existe
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ese usuario ya existe',
        })
      }
      else{
        // confirmo que es un usuario nuevo
        await setDoc(doc(wordsRef, userNickNameTrim.toUpperCase()), {
          nickname:  `${userNickNameTrim.toUpperCase()}`, 
          nombre: userNameTrim.toUpperCase(), 
          contrasena: userPasswordTrim,
          palabra: ['LAPTOP','HOLA','JUEGO', 'CASA', 'FELIZ', 'ESTUDIO', 'CAMA', 'PUERTA', 'TRABAJO', 'SORPRESA', 'AMOR'],
          urlImg: srcImg()
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe rellenar todos los campos',
    });
  };
}

let antiguoId = "prueba";
let avataresId = function () {
  avatares.forEach(el => {
    el.addEventListener("click", e => {
      if (antiguoId != "prueba"){
        // para eliminar el borde del del que ya esta seleccionado
        const lastId = document.getElementById(antiguoId);
        lastId.style.border = 'none';
      }
      // para encontrar el nuevo id del avatar seleccionado
      const id = e.target.getAttribute("id");
      const idAvatar = document.getElementById(id);
      
      // retorno el estilo
      idAvatar.style.border = '2px solid'
      return antiguoId = id;
    });
    return antiguoId;
  })
  return antiguoId
};
avataresId()

