const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');

import {firebaseConfig} from "../modules/firebaseConfig.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
import { collection, doc, setDoc, query, where, getDocs, getDoc} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
const wordsRef = collection(db, "words");

btnAuthenticate.addEventListener('click', authenticate);

async function authenticate (){
    console.log('entro');
    let userNickNameTrim = userNickName.value.trim()
    let userPasswordTrim = userPassword.value.trim()

    if (userNickNameTrim != "" && userPasswordTrim != ""){
        const docRef = doc(db, "words", `${userNickName.value}`);
        try {
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            Swal.fire(
                'Buen trabajo!',
                'Usuario verificado!',
                'success'
            ) 
          }
          else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe registrarse',
            })
          } 
        }
        catch (error) {
          console.log(error);
        }
    }else{
        console.log('en blanco');
    };
}