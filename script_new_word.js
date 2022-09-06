const inputNewWord = document.querySelector('.input-new-word');
const buttonNewWord = document.querySelector('.btn-begin-game');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = getFirestore(app);

//Eventos y constantes del database
buttonNewWord.addEventListener('click',actualizarData);
let arrayBase;
const docRef = doc(db, "words", "prueba");
const docSnap = await getDoc(docRef);

// Add a new document in collection "cities" Metodo para verificar si existe y modificarlo. Sino crear uno nuevo
function addWord () {
  setDoc(doc(db, "words", "prueba"), {
    palabra: arrayBase,
});
}

// Para obtener los datos de la bd Coleccion words, documentID prueba
function descargarData () {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().palabra);
    arrayBase = docSnap.data().palabra;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}


// PARA ACTUALIZAR LA BASE DE DATOS
function actualizarData (){
  descargarData()
  arrayBase.push(inputNewWord.value);
  addWord()
  console.log("Document data:", docSnap.data().palabra);
}

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