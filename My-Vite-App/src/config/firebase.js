// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSdZZ8mOllgcABRaPcTAmJByvb-IY3RFk',
  authDomain: 'reactcursos-480e1.firebaseapp.com ',
  projectId: 'reactcursos-480e1',
  storageBucket: 'reactcursos-480e1.firebasestorage.app',
  messagingSenderId: '121451392572',
  appId: '1:121451392572:web:73c7aab2f0c678af2c5d39',
};

// Initialize Firebase
const firebaseAcademia = initializeApp(firebaseConfig);
export default firebaseAcademia;

