const classPlusBtn = document.querySelector("#classBtn"); // 수업 추가 버튼
const registrationDiv = document.querySelector(".registration-container"); // 수업 등록 div
const registrationBtn = document.querySelector("#registrationBtn"); // 수업 등록 버튼
const h1 = document.querySelector(".title"); // 타이틀
const classDiv = document.querySelector(".classDiv"); // 수업 목록

classPlusBtn.addEventListener("click", () => {
  registrationDiv.classList.add("on"); // 수업 등록 div에 on 구분자 클래스 추가
  if (registrationDiv.classList.contains("on")) { // on 클래스가 있으면
    registrationDiv.style.display = "block"; // none으로 감춰뒀던 수업 등록 div 보이게 디스플레이 block
    h1.style.display = "none"; // 타이틀은 안보이게 none
    classDiv.style.display = "none"; // class 목록도 잠시 수업 등록 작성까지 감춰둠
    registrationDiv.classList.remove("on"); // on 클래스 제거
  }
});

const title = document.querySelector("#classTitle"); // 수업 등록시 입력하는 수업 제목

registrationBtn.addEventListener("click", () => {
  if (!registrationDiv.classList.contains("on")) {
    const childBtn = document.createElement("button");
    childBtn.id = "classBtn"; // 모든 목록 버튼 스타일 통일
    let titleText = title.value; // 수업 제목 가져오기
    childBtn.innerText = titleText; // 새로 만든 수업 목록에 수업 제목 넣기
    h1.style.display = "block"; // 타이틀 다시 보이게
    classDiv.style.display = "grid" // + 버튼이랑 class 목록 보이게
    registrationDiv.style.display = "none"; // 수업 등록 div 감춤
    classDiv.appendChild(childBtn); // class 목록에 새로운 수업 자식으로 붙이기
    classDiv.appendChild(classPlusBtn); // 그 후 플러스 버튼 붙이기
    classPlusBtn.style.display = "inline-block"; // 플러스 버튼 디스플레이 변경
  }
});
