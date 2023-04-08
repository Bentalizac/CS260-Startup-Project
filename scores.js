
   // Get the RGB values from the previous page
   const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"));
   const userName = JSON.parse(localStorage.getItem("userName"));
   
   // Get the username from the previous page
   const username = localStorage.getItem("username");

   // Get the scores table body element
   const scoresTableBody = document.getElementById("scores-table-body");

   // Create a new row for the table
   const newRow = scoresTableBody.insertRow();

   // Add the username to the row
   const usernameCell = newRow.insertCell();
   usernameCell.textContent = username;

   // Add the randomly generated RGB values to the row
   const randomRgbCell = newRow.insertCell();
   randomRgbCell.textContent = `(${sessionInfo[0].red}, ${sessionInfo[0].green}, ${sessionInfo[0].blue})`;

   // Add the user-input RGB values to the row
   const userInputRgbCell = newRow.insertCell();
   userInputRgbCell.textContent = `(${sessionInfo[1].red}, ${sessionInfo[1].green}, ${sessionInfo[1].blue})`;

   // Add the color swatch to the row
   const colorSwatchCell = newRow.insertCell();
   colorSwatchCell.style.backgroundColor = `rgb(${sessionInfo[0].red}, ${sessionInfo[0].green}, ${sessionInfo[0].blue})`;
   colorSwatchCell.style.width = "50px";
   colorSwatchCell.style.height = "50px";
  
