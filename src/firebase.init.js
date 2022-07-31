// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvY5Yy9Q3nVnIALrymwzGj_6wxA6ABqWQ",
    authDomain: "quiz-app-6cea6.firebaseapp.com",
    projectId: "quiz-app-6cea6",
    storageBucket: "quiz-app-6cea6.appspot.com",
    messagingSenderId: "535858399981",
    appId: "1:535858399981:web:127fa7bb70735671b9dae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;