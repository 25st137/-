const form = document.getElementById("applyForm");
const overlay = document.getElementById("successOverlay");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    major: document.getElementById("major").value,
    motivation: document.getElementById("motivation").value,
    skill: document.getElementById("skill").value
  };

  // 기존 데이터 불러오기
  let saved = JSON.parse(localStorage.getItem("applications")) || [];

  // 새 답변 추가
  saved.push(data);

  // 다시 저장
  localStorage.setItem("applications", JSON.stringify(saved));

  // 체크 표시
  overlay.classList.add("show");

  setTimeout(()=>{
    overlay.classList.remove("show");
    form.reset();
  },2000);
});
