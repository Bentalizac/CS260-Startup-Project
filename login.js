let sessionInfo = [
  {},
  {},
  {username: "", score: 0}
]



function login() {
    localStorage.clear("userName");
    sessionInfo[2].username = document.querySelector("#name").value;
    localStorage.setItem("sessionInfo", sessionInfo);
    window.location.href = "play.html";
  }