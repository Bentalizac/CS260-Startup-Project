let sessionInfo = [
  {red: 0, green: 0, blue: 0},
  {red: 0, green: 0, blue: 0},
  {username:"BEEE", score: 0}
];

console.log("Running Node.js"); 

function login() {
  // Get the username from the input field
  let username = document.getElementById("username").value;
  console.log(username);

  // Update the sessionInfo object with the username
  sessionInfo[2].username = username;

  // Store the sessionInfo object in localStorage
  localStorage.setItem("sessionInfo", JSON.stringify(sessionInfo));

  // Navigate to the play page
  window.location.href = "play.html";
}