let percent1;
let percent2;

$(document).ready(function () {
  //프로그래스 바를 클릭
  $(".progress1").click(function (e) {
    // 변수 x는 .progress의 left값에서 클릭한 위치의 X값을 뺀다.
    // e.pageX는 화면에서 클릭한 X의 위치를 가져온다.
    var x = e.pageX - $(".progress1").offset().left;
    //변수 clickPercentage는 변수 x / .progress.너비
    clickPercentage = x / $(".progress1").width();
    //.state의 너비는 (.progress의 너비에서 변수 clickPercentage를 곱한 값);
    $(".state1").width($(".progress1").width() * clickPercentage);
    var percentage = Math.floor(clickPercentage * 100);
    percent1 = percentage;
    //Math.floor() 소수점 버림, 정수를 반환하는 함수
    $("#percentage1").text(percentage);
  });
});

$(document).ready(function () {
  //프로그래스 바를 클릭
  $(".progress2").click(function (e) {
    // 변수 x는 .progress의 left값에서 클릭한 위치의 X값을 뺀다.
    // e.pageX는 화면에서 클릭한 X의 위치를 가져온다.
    var x = e.pageX - $(".progress2").offset().left;
    //변수 clickPercentage는 변수 x / .progress.너비
    clickPercentage = x / $(".progress2").width();
    //.state의 너비는 (.progress의 너비에서 변수 clickPercentage를 곱한 값);
    $(".state2").width($(".progress2").width() * clickPercentage);
    var percentage = Math.floor(clickPercentage * 100);
    percent2 = percentage;
    //Math.floor() 소수점 버림, 정수를 반환하는 함수
    $("#percentage2").text(percentage);
  });
});

function prercentageFun() {
  console.log("axios post active");
  let q3Value = document.querySelector("#lectureInput").value;
  console.log(percent1);
  console.log(percent2);
  console.log(q3Value);

  axios
    .post("/lectureEvaluation", {
      q1: percent1,
      q2: percent2,
      q3: q3Value,
    })
    .then((res) => console.log(res))
    .then((err) => console.log(err));
}
