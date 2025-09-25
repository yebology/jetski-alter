// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Konfigurasi proyek Firebase Anda
// Ganti dengan kredensial Anda sendiri
const firebaseConfig = {
    apiKey: "AIzaSyARGIfN2lm0QvyrzwTsV963NirbG9hFEGg",
    authDomain: "kecelakaanjetski.firebaseapp.com",
    databaseURL: "https://kecelakaanjetski-default-rtdb.firebaseio.com",
    projectId: "kecelakaanjetski",
    storageBucket: "kecelakaanjetski.firebasestorage.app",
    messagingSenderId: "903023017596",
    appId: "1:903023017596:web:f166022e9300315c5953f9",
    measurementId: "G-PF9L3DE6SW"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };