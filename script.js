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
   Firebase 설정 (통일)
======================= */
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
const auth = getAuth(app);

/* =======================
   지원자 제출 (index.html)
======================= */
const submitBtn = document.getElementById("submit");
if (submitBtn) {
  submitBtn.onclick = async () => {
    await addDoc(collection(db, "applications"), {
      name: document.getElementById("name").value,
      studentId: document.getElementById("studentId").value
    });
    alert("제출 완료");
  };
}

/* =======================
   관리자 로그인 (admin.html)
======================= */
const loginBtn = document.getElementById("login");
if (loginBtn) {
  loginBtn.onclick = async () => {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    );
  };
}

/* =======================
   관리자 페이지 데이터 로딩
======================= */
onAuthStateChanged(auth, async (user) => {
  const adminBox = document.getElementById("adminBox");
  const loginBox = document.getElementById("loginBox");
  const tableBody = document.getElementById("tableBody");

  if (user && adminBox && tableBody) {
    loginBox.style.display = "none";
    adminBox.style.display = "block";

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
});
