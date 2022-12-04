var data123;
let studentsData;

window.onload = async function () {
  let pathname = window.location.pathname;
  let className = pathname.split("/")[2];
  console.log(className);
  await axios.get(`http://localhost:3000/dataPage/${className}`).then((res) => {
    const data = res.headers.name;
    data123 = data.split(",").slice(0, 11);
    let dataArr = [];
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      dataArr[i] = parseInt(data123[i]);
      sum += dataArr[i];
    }
    sum /= 11; // 집중도 바 평균 값
    studentsData = data.split(",").slice(11, 13);
    let stData1 = parseInt(studentsData[0]);
    let stData2 = parseInt(studentsData[1]);
    let realStData = Math.floor((stData1 + stData2) / 2); // 학생 강의평가 데이터
    let arr = [];
    for (let i = 0; i < 11; i++) {
      arr.push(realStData);
    }
    // chart
    new Chart(document.getElementById("canvas"), {
      type: "line",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "수업 집중도",
            data: data123,
            borderColor: "rgba(255, 201, 14, 1)",
            fill: true,
            lineTension: 0, // 직선을 그리려면 0
          },
          {
            label: "강의평가 집중도",
            data: arr,
            borderColor: "skyblue",
            fill: true,
            lineTension: 0,
          },
          {
            label: "사람 평균 집중도",
            data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            borderColor: "purple",
            fill: false,
            lineTension: 0,
          },
        ],
      },
      options: {
        responsive: false, // false면 차트 크기 조정 가능
        title: {
          display: true,
          text: "수업 + 강의평가 집중도",
        },
        tooltips: {
          // 그래프에 마우스 대면 데이터 텍스트로 보여주는 툴팁
          mode: "index", // 동일한 인데스인 항목을 찾습니다.
          intersect: false, // 툴팁 모드는 마우스 위치가 요소를 교차할 때만 적용
        },
        hover: {
          mode: "nearest", // 점과 가장 가까운 거리에 있는 항목들을 가져옵니다.
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              // x축
              display: true,
              scaleLabel: {
                display: true,
                labelString: "minutes",
              },
            },
          ],
          yAxes: [
            {
              // y축
              display: true,
              ticks: {
                max: 10,
                suggestedMin: 0,
              },
              scaleLabel: {
                display: true,
                labelString: "concentration",
              },
            },
          ],
        },
      },
    });

    // 막대 그래프
    const progressReal = document.querySelector(".progressReal");
    const progressLecture = document.querySelector(".progressLecture");

    progressReal.style.width = `${sum * 10}%`;
    progressReal.innerHTML = `<span>${sum * 10}%</span>`;

    progressLecture.style.width = `${realStData * 10}%`;
    progressLecture.innerHTML = `<span>${realStData * 10}%</span>`;
  });
};
