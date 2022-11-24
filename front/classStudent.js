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

let uniqueCount = 1; // 새로운 버튼 id에 순차적으로 달 카운트
let identifier = 0; // 식별자

const searchInput = document.querySelector("#classSearch");
const childBtn = document.createElement("button"); // 검색해서 수업이 있다면 생기는 버튼
const br = document.createElement("br");

async function searchSubmit() {
  console.log("axios active");

  await axios
    // await를 쓰지 않으면 통신속도때문에 검색버튼을 한번 눌러도 버튼이 달리지 않음
    // await써야지 통신 기다렸다가 한번에 달림
    .get("http://localhost:3000/class/find/?keyword")
    .then((res) => {
      const searchValue = searchInput.value;
      // const className = res.data[0].className; // 데베 수업 이름
      const classArr = res.data;
      const classNameArr = classArr.map((element) => {
        // 배열객체에서 className만 추출하여 배열로 만듬
        return element.className;
      });
      const realClassName = classNameArr.filter((element) => {
        // 추출한 className배열에서 inputValue와 일치하는 값만 걸러냄
        return searchValue == element;
      });

      if (realClassName[0] != undefined) {
        identifier = 1; // 식별자
        childBtn.innerText = realClassName[0]; // 새롭게 생성한 버튼 수업병으로
      } else {
        childBtn.remove(); // 일치 안하면 생성한 버튼 삭제
        br.remove();
        alert("수업이 없습니다.");
      }
    })
    .then((err) => {
      console.log(err);
    });

  if (identifier == 1) {
    // 식별자가 1(일치하는 수업명이 있으면)
    searchInput.insertAdjacentElement("afterend", childBtn); // 인풋창 뒤에 버튼 달고
    searchInput.insertAdjacentElement("afterend", br);
    identifier = 0; // 식별자 값 초기화
  }
}

childBtn.addEventListener("click", () => {
  console.log("i am live2");
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
  classSearch.value = ""; // 인풋창 초기화
  childBtn.innerText = ""; // 새롬게 생기는 버튼을 위해서 값 초기화
});
