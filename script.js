// 🔥 Firebase 초기화 (기존 config 그대로 두세요)
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================
// 요소 가져오기
// ============================

const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
const overlay = document.getElementById("successOverlay");

const passion = document.getElementById("passion");
const growth = document.getElementById("growth");
const passionValue = document.getElementById("passionValue");
const growthValue = document.getElementById("growthValue");

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const loginBtn = document.getElementById("loginBtn");

// ============================
// 슬라이더 표시
// ============================

passion.oninput = () => passionValue.textContent = passion.value;
growth.oninput = () => growthValue.textContent = growth.value;

// ============================
// 🔐 관리자 로그인
// ============================

adminBtn.addEventListener("click", () => {
  adminModal.classList.add("show");
});

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("adminPassword").value; 
  // 🔥 여기 input을 이메일 입력창으로 사용 (html에서 type=email 권장)
  
  const password = prompt("관리자 비밀번호 입력");

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    if(userCredential.user.email === "administer@email.com"){ 
      alert("관리자 로그인 성공");
      adminModal.classList.remove("show");
      loadData(); // 관리자 로그인 시 데이터 불러오기
    } else {
      alert("관리자 계정이 아닙니다.");
      auth.signOut();
    }

  } catch(error){
    alert("로그인 실패: " + error.message);
  }
});

// ============================
// 📦 Firestore 저장
// ============================

form.addEventListener("submit", async function(e){
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    motivation: document.getElementById("motivation").value,
    passion: passion.value,
    growth: growth.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection("applications").add(data);

    overlay.classList.add("show");
    setTimeout(() => overlay.classList.remove("show"), 2000);

    form.reset();
    passionValue.textContent = "5";
    growthValue.textContent = "5";

  } catch(error){
    alert("저장 실패: " + error.message);
  }
});

// ============================
// 📊 Firestore 데이터 불러오기
// ============================

async function loadData(){
  tableBody.innerHTML = "";

  const snapshot = await db.collection("applications")
    .orderBy("createdAt", "desc")
    .get();

  snapshot.forEach(doc => {
    const data = doc.data();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.motivation}</td>
      <td>${data.passion}</td>
      <td>${data.growth}</td>
    `;

    tableBody.appendChild(row);
  });
}

// ============================
// 로그인 상태 감지
// ============================

auth.onAuthStateChanged(user => {
  if(user && user.email === "administer@email.com"){
    loadData();
  }
});
