// js/firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
