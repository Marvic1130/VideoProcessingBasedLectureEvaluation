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
let identifier = 0; // 식별자

const searchInput = document.querySelector("#classSearch");
const childBtn = document.createElement("button"); // 검색해서 수업이 있다면 생기는 버튼

searchBtn.addEventListener("click", (e) => {
  // 클릭해서
  if (identifier == 1) {
    console.log("SearchBtn active");
    e.preventDefault();
    searchInput.insertAdjacentElement("afterend", childBtn);
    const br = document.createElement("br");
    searchInput.insertAdjacentElement("afterend", br);
  } else {
    childBtn.remove();
  }
});

function searchSubmit() {
  console.log("axios active");

  axios
    .get("http://localhost:3000/class/find/?keyword")
    .then((res) => {
      const className = res.data[0].className; // 데베 수업 이름
      const searchValue = searchInput.value;

      if (className == searchValue) {
        identifier = 1;
        childBtn.innerText = className;
      } else {
        alert("수업이 없습니다.");
      }
    })
    .then((err) => {
      console.log(err);
    });
}

childBtn.addEventListener("click", () => {
  const lectureBtn = document.createElement("button"); // 수업 목록에 생길 버튼
  lectureBtn.id = "classBtn" + uniqueCount;
  lectureBtn.innerText = childBtn.innerText;
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
