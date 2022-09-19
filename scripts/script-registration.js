const userName = document.getElementById('user-name');
const userNickName = document.getElementById('user-nickname');
const userPassword = document.getElementById('user-password');
const btnAuthenticate = document.querySelector('.autenticar-btn');


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTzym29yivKoTAiOoDKZXygMgMyi1J-hI",
  authDomain: "juego-ahorcado-6feeb.firebaseapp.com",
  projectId: "juego-ahorcado-6feeb",
  storageBucket: "juego-ahorcado-6feeb.appspot.com",
  messagingSenderId: "911015404308",
  appId: "1:911015404308:web:3eb95399e51d7eb7b25801"
};

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
    const docRef = doc(db, "words", `${userNickName.value}`);
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
        await setDoc(doc(wordsRef, userNickName.value), {
          nickname:  `@${userNickName.value.trim()}`, 
          nombre: userName.value.trim(), 
          contrsena: userPassword.value.trim(),
          palabras: []});
        }
        Swal.fire(
          'Buen trabajo!',
          'Usuario registrado!',
          'Exito'
        )
        window.open("./user-authentication.html","_self")
      } 
    catch (error) {
      console.log(error);
    }
  }else{
    console.log('en blanco');
  };
}


