const classBtn = document.querySelector("#classBtn"); // 수업 추가 버튼
const selectContainer = document.querySelector(".select-container"); // 수업 선택 div

classBtn.addEventListener("click", () => {
  // + 버튼 클릭시
  selectContainer.classList.add("on"); // 셀렉트 컨테이너에 on 클래스 추가
  if (selectContainer.classList.contains("on")) {
    selectContainer.style.display = "inline-block"; // 평소에는 none임
    selectContainer.classList.remove("on"); // on 클래스 제거
  }
});

const finishBtn = document.querySelector("#finishBtn"); // 수업 등록 완료 버튼
const classDiv = document.querySelector(".classDiv"); // 수업 목록
let uniqueCount = 1;

finishBtn.addEventListener("click", () => {
  // 클릭해서
  if (!selectContainer.classList.contains("on")) {
    // on클래스 없으면
    const optionValue = document.querySelector("#classSelect"); // 셀렉트 박스
    let value = optionValue.options[optionValue.selectedIndex].text; // 셀렉트 박스에서 옵션값 가져오기
    const childBtn = document.createElement("button"); // 새로운 버튼 엘리먼트 생성
    const aTag = document.createElement("a");
    childBtn.id = "classBtn" + uniqueCount; // 버튼 스타일 통일
    childBtn.addEventListener("click", () => {
      aTag.innerHTML = childBtn.outerHTML;
      aTag.setAttribute("href", "/lectureEvaluation");
      childBtn.parentNode.insertBefore(aTag, childBtn);
      childBtn.remove();
    });
    uniqueCount += 1;
    childBtn.innerText = value; // 새로운 버튼 text 옵션값으로 넣음
    classDiv.appendChild(childBtn); // class 목록에 새로운 수업 자식으로 붙이기
    classDiv.appendChild(classBtn); // 그 후 플러스 버튼 붙이기
    selectContainer.style.display = "none"; // 다시 셀렉트 컨테이너 none
  }
});

const cookies = Object.fromEntries(
  document.cookie.split(";").map((cookie) => cookie.trim().split("="))
);

console.log(cookies.accessToken);

fetch("http://localhost:3000", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    if (response) {
      console.log("hi");
      localStorage.setItem("wtw-token", cookies.accessToken);
    }
  })
  .catch((err) => console.log(err));
