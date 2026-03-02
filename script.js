// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =======================
   Firebase 설정
======================= */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "club-application-form.firebaseapp.com",
  projectId: "club-application-form",
  storageBucket: "club-application-form.firebasestorage.app",
  messagingSenderId: "427148856180",
  appId: "1:427148856180:web:7f90fea3460fa92e0dfa21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* =======================
   지원자 제출
======================= */
const form = document.getElementById("applyForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "applications"), {
      name: document.getElementById("name").value,
      major: document.getElementById("major").value,
      motivation: document.getElementById("motivation").value,
      skill: document.getElementById("skill").value,
      createdAt: new Date()
    });

    form.reset();
    document.getElementById("skill").value = 0;

    const overlay = document.getElementById("successOverlay");
    overlay.classList.add("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 800);
  });
}

/* =======================
   관리자 로그인
======================= */
const loginBtn = document.getElementById("login");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        document.getElementById("email").value,
        document.getElementById("password").value
      );
    } catch (error) {
      alert("로그인 실패");
    }
  });
}

/* =======================
   관리자 데이터 로딩
======================= */
onAuthStateChanged(auth, async (user) => {

  const adminBox = document.getElementById("adminBox");
  const loginBox = document.getElementById("loginBox");
  const tableBody = document.getElementById("tableBody");

  if (user && adminBox && tableBody) {

    loginBox.style.display = "none";
    adminBox.style.display = "block";

    const snapshot = await getDocs(collection(db, "applications"));

    tableBody.innerHTML = "";

    snapshot.forEach(doc => {
      const d = doc.data();

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.name}</td>
        <td>${d.major}</td>
        <td>${d.skill}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
});
