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

const searchBtn = document.querySelector("#searchBtn"); // 수업 등록 완료 버튼
const classDiv = document.querySelector(".classDiv"); // 수업 목록

let uniqueCount = 1;

const lectures = ["class1", "class2", "class3"]; // 임시 수업 데이터

searchBtn.addEventListener("click", () => {
  // 클릭해서
  if (!selectContainer.classList.contains("on")) {
    // on클래스 없으면

    let lectureValue = document.querySelector("#classSearch").value;

    const childBtn = document.createElement("button"); // 검색하면 생기는 버튼
    const classSearch = document.querySelector("#classSearch"); // 수업 검색 인풋

    lectures.find((elem) => {
      if (elem == lectureValue) {
        childBtn.innerText = lectureValue;
        classSearch.insertAdjacentElement("afterend", childBtn);
        const br = document.createElement("br");
        classSearch.insertAdjacentElement("afterend", br);
      } else {
        return 0;
      }
    });

    childBtn.addEventListener("click", () => {
      // 버튼 클릭시
      const lectureBtn = document.createElement("button"); // 수업 목록에 생길 버튼
      lectureBtn.id = "classBtn" + uniqueCount;
      lectureBtn.innerText = lectureValue;
      classBtn.insertAdjacentElement("beforebegin", lectureBtn); // 수업 목록에 버튼 달기

      const aTag = document.createElement("a"); // 버튼에 적용할 a태그
      aTag.innerHTML = lectureBtn.outerHTML;
      aTag.setAttribute("href", "/lectureEvaluation");
      lectureBtn.parentNode.insertBefore(aTag, lectureBtn);
      lectureBtn.remove(); // 여기까지 a태그로 감싸는 과정

      selectContainer.style.display = "none"; // 다시 셀렉트 컨테이너 none
      uniqueCount += 1;
      childBtn.remove(); // 검색해서 뜬 버튼 삭제
      classSearch.value = "";
    });
  }
});
