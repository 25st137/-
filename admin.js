import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAux1RJy_gk6OPEy558Xh48I1gNTmtTv_I",
  authDomain: "club-application-form.firebaseapp.com",
  projectId: "club-application-form",
  storageBucket: "club-application-form.firebasestorage.app",
  messagingSenderId: "427148856180",
  appId: "1:427148856180:web:7f90fea3460fa92e0dfa21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tableBody = document.getElementById("tableBody");

async function loadApplications() {
  const snapshot = await getDocs(collection(db, "applications"));

  snapshot.forEach(doc => {
    const d = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.studentId}</td>
    `;
    tableBody.appendChild(tr);
  });
}

loadApplications();
