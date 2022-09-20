const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');
const user = document.getElementById('user-nick-name');
const closeSessionBtn = document.querySelector('.close-session');
const imgAvatar = document.getElementById('avatar');
const userContainer = document.getElementById('user-container');
const returnBtn = document.querySelector('.return-icon');

import {firebaseConfig} from "../modules/firebaseConfig.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { closeSession } from "../modules/close-session.js";

// obtencion del usuario
let userJsonData = sessionStorage.getItem('usuario');
let userGame = JSON.parse(userJsonData);
user.innerHTML = ` ${userGame.name}`;
imgAvatar.setAttribute('src',userGame.urlImg);

console.log(userGame);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
import { collection, doc, setDoc, query, where, getDocs, getDoc} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
const wordsRef = collection(db, "words");

btnAuthenticate.addEventListener('click', authenticate);
returnBtn.addEventListener('click', () => {window.open("./index.html","_self")});

let userData;

// funcion para autenticar al usuario
async function authenticate (){
    let userNickNameTrim = userNickName.value.trim();
    let userPasswordTrim = userPassword.value.trim();
    console.log(userNickNameTrim);
    console.log(userPasswordTrim);

    if (userNickNameTrim != "" && userPasswordTrim != "" && userGame.nickname != userNickNameTrim.toUpperCase()){
      const q = query(wordsRef, where("nickname", "==", `${userNickNameTrim.toUpperCase()}`), where("contrasena", "==", `${userPasswordTrim}`));
        // const docRef = doc(db, "words", `${userNickNameTrim.toUpperCase()}`);
        try {
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot.docs.length);
          if (querySnapshot.docs.length == 1){
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              userData = {
                name: (doc.data()).nombre,
                nickname: (doc.data()).nickname,
                palabra : "",
                urlImg: (doc.data()).urlImg
              }
              window.open("./index.html","_self");

              let userJSON = JSON.stringify(userData)
              sessionStorage.setItem("usuario", userJSON);
            });
          }  
          else{
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no encontrado',
            })
          }
          // const docSnap = await getDoc(docRef);
          // if(docSnap.exists()){
          //   Swal.fire(
          //       'Buen trabajo!',
          //       'Usuario verificado!',
          //       'success'
          //   )
          //   userData = {
          //       name: (docSnap.data()).nombre,
          //       nickname: (docSnap.data()).nickname,
          //       palabra: ""
          //   }
           
          // }else{
          //   Swal.fire({
          //       icon: 'error',
          //       title: 'Oops...',
          //       text: 'Usuario no encontrado',
          //   })
          // }; 
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
userContainer.addEventListener('click', toogleCloseSession);
closeSessionBtn.addEventListener('click',closeSession);

function toogleCloseSession(){
  closeSessionBtn.classList.toggle('inactive');
}
