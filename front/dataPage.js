// chart
new Chart(document.getElementById("canvas"), {
  type: "line",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "수업 집중도",
        data: [10, 3, 30, 23, 10, 5, 50],
        borderColor: "rgba(255, 201, 14, 1)",
        fill: true,
        lineTension: 0, // 직선을 그리려면 0
      },
      {
        label: "강의평가 집중도",
        data: [1, 3, 15, 10, 25, 30, 5],
        borderColor: "skyblue",
        fill: true,
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
            labelString: "hour",
          },
        },
      ],
      yAxes: [
        {
          // y축
          display: true,
          ticks: {
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

let realData = 80;
let lectureData = 20;

progressReal.style.width = realData;
progressReal.innerHTML = `<span>${realData}%</span>`;

progressLecture.style.width = realData;
progressLecture.innerHTML = `<span>${lectureData}%</span>`;
