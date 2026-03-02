// ============================
// 🔥 Firebase 초기화
// ============================
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================
// 요소
// ============================
const loginBtn = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");
const tableBody = document.getElementById("tableBody");

// ============================
// 🔐 관리자 로그인
// ============================
loginBtn.addEventListener("click", async () => {

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);

    if (userCredential.user.email === "administer@email.com") {

      alert("관리자 로그인 성공");

      loginBox.style.display = "none";
      adminBox.style.display = "block";

      loadData();

    } else {
      alert("관리자 계정이 아닙니다.");
      auth.signOut();
    }

  } catch (error) {
    alert("로그인 실패: " + error.message);
  }

});

// ============================
// 📊 Firestore 데이터 불러오기
// ============================
async function loadData() {

  tableBody.innerHTML = "";

  const snapshot = await db.collection("applications")
    .orderBy("createdAt", "desc")
    .get();

  snapshot.forEach(doc => {
    const data = doc.data();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.studentId || "-"}</td>
    `;

    tableBody.appendChild(row);
  });

}

// ============================
// 로그인 상태 유지
// ============================
auth.onAuthStateChanged(user => {
  if (user && user.email === "administer@email.com") {
    loginBox.style.display = "none";
    adminBox.style.display = "block";
    loadData();
  }
});
