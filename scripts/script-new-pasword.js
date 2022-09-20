const userName = document.querySelector('#user-name');
const userNickName = document.querySelector('#user-nickname');
const userNewPassword = document.querySelector('#user-new-password');
const userAgainNewPassword = document.querySelector('#user-again-new-password');
const btnActualizar = document.querySelector('#actualizate-btn');
const returnBtn = document.querySelector('.return-icon');

// Cargando array de palabras en modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { doc, getDoc, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

import {firebaseConfig} from "../modules/firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const wordsRef = collection(db, "words");



btnActualizar.addEventListener('click', actualizarPassword);
returnBtn.addEventListener('click', () => {window.open("./user-authentication.html","_self")});


let userData;
let userNewData;

async function actualizarPassword() {
    userNewData = {
        nombre: userName.value.trim(),
        nickName: userNickName.value.trim(),
        newPassword: userNewPassword.value.trim(),
        repeatNewPassword: userAgainNewPassword.value.trim()
    }

    const q = query(wordsRef, where("nickname", "==", `${userNewData.nickName.toUpperCase()}`), where("nombre", "==", `${userNewData.nombre.toUpperCase()}`));
    console.log(userNewData.nombre.toUpperCase());
    console.log(userNewData.nickName.toUpperCase());
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length == 1){
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                userData = {
                    name: (doc.data()).nombre,
                    nickname: (doc.data()).nickname,
                }
                if (userNewData.newPassword === userNewData.repeatNewPassword && userNewData != "") {
                    actualizarData(doc.id, userNewData.newPassword);
                    Swal.fire(
                        'Buen trabajo!',
                        'Contraseña actualizada!',
                        'success'
                      )
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No deje campos sin rellenar',
                    })
                }
                
            });
        }  
        else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario no encontrado',
          })
        }; 
    }
    catch(error){
        console.log(error);
    }
    console.log(userData);
};

async function actualizarData(idUser, passwordNew){
    const docRef = doc(db, "words", `${idUser}`);
    await updateDoc(docRef, {
        contrasena: passwordNew
    });
}