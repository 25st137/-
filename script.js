// ==============================
// Firebase CDN Imports (GitHub Pages용)
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ==============================
// Firebase 설정
// ==============================
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


// ==============================
// 지원자 제출 (index.html)
// ==============================
const form = document.getElementById("applyForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "applications"), {
        name: document.getElementById("name").value,
        major: document.getElementById("major").value,
        motivation: document.getElementById("motivation").value,
        skill: Number(document.getElementById("skill").value),
        createdAt: new Date()
      });

      // 전체 리셋
      form.reset();
      document.getElementById("skill").value = 0;

      const overlay = document.getElementById("successOverlay");
      if (overlay) {
        overlay.classList.add("show");
        setTimeout(() => overlay.classList.remove("show"), 800);
      }

    } catch (error) {
      console.error("제출 오류:", error);
      alert("제출 실패");
    }
  });
}


// ==============================
// 관리자 로그인 (admin.html)
// ==============================
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
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  });
}


// ==============================
// 관리자 데이터 로딩
// ==============================
onAuthStateChanged(auth, async (user) => {

  const adminBox = document.getElementById("adminBox");
  const loginBox = document.getElementById("loginBox");
  const tableBody = document.getElementById("tableBody");

  if (!adminBox) return;

  if (user) {

    loginBox.style.display = "none";
    adminBox.style.display = "block";

    try {
      const q = query(
        collection(db, "applications"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      tableBody.innerHTML = "";

      if (snapshot.empty) {
        tableBody.innerHTML = "<tr><td colspan='3'>데이터 없음</td></tr>";
        return;
      }

      snapshot.forEach(doc => {
        const d = doc.data();

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${d.name || ""}</td>
          <td>${d.major || ""}</td>
          <td>${d.motivation || ""}</td>
          <td>${d.skill ?? ""}</td>
        `;
        tableBody.appendChild(tr);
      });

    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      alert("데이터 불러오기 실패");
    }

  }
});
