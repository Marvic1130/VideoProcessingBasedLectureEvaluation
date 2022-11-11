const form = document.querySelector("#form");
const cookies = Object.fromEntries(
  document.cookie.split(";").map((cookie) => cookie.trim().split("="))
);

console.log(cookies);

form.addEventListener("submit", () => {
  console.log("hi2");
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
});
