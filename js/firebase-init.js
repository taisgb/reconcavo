// js/firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsvDDvv8R5Wl5OraBG7ERsl1wYQPGjseg",
  authDomain: "reconcavoea-2b7ad.firebaseapp.com",
  projectId: "reconcavoea-2b7ad",
  storageBucket: "reconcavoea-2b7ad.appspot.com",
  messagingSenderId: "756185198147",
  appId: "1:756185198147:web:9de201fb8c29f292b2aef6",
  measurementId: "G-LFCMKDGD8X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };