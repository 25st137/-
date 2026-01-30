// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Firebase 설정 (본인 프로젝트 값)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* =======================
   지원자 제출
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
   관리자 로그인
======================= */
const loginBtn = document.getElementById("login");
if (loginBtn) {
  loginBtn.onclick = () => {
    signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
  };
}

/* =======================
   관리자 페이지 로딩
======================= */
onAuthStateChanged(auth, async (user) => {
  if (user && document.getElementById("adminBox")) {
    loginBox.style.display = "none";
    adminBox.style.display = "block";

    const snapshot = await getDocs(collection(db, "applications"));
    snapshot.forEach(doc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${doc.data().name}</td>
        <td>${doc.data().studentId}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
});
