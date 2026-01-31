// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAux1RJy_gk6OPEy558Xh48I1gNTmtTv_I",
  authDomain: "club-application-form.firebaseapp.com",
  projectId: "club-application-form",
  storageBucket: "club-application-form.firebasestorage.app",
  messagingSenderId: "427148856180",
  appId: "1:427148856180:web:7f90fea3460fa92e0dfa21"
};

// 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML 요소
const list = document.getElementById("applicationList");

// 신청서 목록 불러오기
async function loadApplications() {
  const querySnapshot = await getDocs(collection(db, "applications"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const li = document.createElement("li");
    li.textContent =
      "이름: " + data.name +
      " / 학년: " + data.grade +
      " / 지원동기: " + data.reason;

    list.appendChild(li);
  });
}

loadApplications();
