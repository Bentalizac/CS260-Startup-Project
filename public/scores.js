   // Get the RGB values from the previous page
   const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"));
   const userName = sessionInfo.username;

   // Get the scores table body element
   const scoresTableBody = document.getElementById("scores-table-body");
   const leaderBoard = document.getElementById("leaderboard");
   // Create a new row for the table
   const newRow = scoresTableBody.insertRow();

   // Add the username to the row
   const usernameCell = newRow.insertCell();
   usernameCell.textContent = userName;

   // Add the randomly generated RGB values to the row
   const randomRgbCell = newRow.insertCell();
   randomRgbCell.textContent = `(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;

   // Add the color swatch to the row
   const colorSwatchCell = newRow.insertCell();
   colorSwatchCell.style.backgroundColor = `rgb(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;
   colorSwatchCell.style.width = "100px";
   colorSwatchCell.style.height = "100px";
   

   let actualName = () => {
      let url = 'https://www.thecolorapi.com/id?rgb=' + sessionInfo.actualRGB[0] + ',' + sessionInfo.actualRGB[1] + ',' + sessionInfo.actualRGB[2] +  '&format=json';
      return fetch(url)
        .then(response => {
          if (response.ok) {
            // Extract the data from the API response
            return response.json();
          }
          throw new Error('Error making API request');
        })
        .then(data => {
          // Return the name of the color
          return data.name.value;
        })
        .catch(error => {
          return 'error';
        });
    }
    
    actualName().then(name => {
      const nameElement = document.createElement("span");
      nameElement.textContent = name;
      nameElement.style.border = "1px medium grey";
      nameElement.style.borderRadius = "3px";
      nameElement.style.backgroundColor = 'white';

      colorSwatchCell.textContent = "";
      colorSwatchCell.appendChild(nameElement);
    });

   // Add the user-input RGB values to the row
   const userInputRgbCell = newRow.insertCell();
   userInputRgbCell.textContent = `(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;

   
  

   // Add the color swatch to the row
   const userSwatchCell = newRow.insertCell();
   userSwatchCell.style.backgroundColor = `rgb(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;
   userSwatchCell.style.width = "100px";
   userSwatchCell.style.height = "100px";


   let userColor = () => {
      let url = 'https://www.thecolorapi.com/id?rgb=' + sessionInfo.userRGB[0] + ',' + sessionInfo.userRGB[1] + ',' + sessionInfo.userRGB[2] +  '&format=json';
      return fetch(url)
        .then(response => {
          if (response.ok) {
            // Extract the data from the API response
            return response.json();
          }
          throw new Error('Error making API request');
        })
        .then(data => {
          // Return the name of the color
          return data.name.value;
        })
        .catch(error => {
          return 'error';
        });
    }
    
    userColor().then(name => {
      const nameElement = document.createElement("span");
      nameElement.textContent = name;
      nameElement.style.border = "1px medium grey";
      nameElement.style.backgroundColor = 'white';
      nameElement.style.borderRadius = "3px";
      userSwatchCell.textContent = "";
      userSwatchCell.appendChild(nameElement);
    });

   const accuracyCell = newRow.insertCell();
   //accuracyCell.textContent = (localStorage.getItem("score")*100) + "%";
   accuracyCell.textContent = (sessionInfo.score*100) + "%";

   createLeaderboardForUser(userName)

   async function createLeaderboard() {
    // Fetch the session info array from the server
    const response = await fetch("/getAllInfo");
    if (!response.ok) {
      throw new Error(`Failed to fetch session info: ${response.status} ${response.statusText}`);
    }
    const sessionInfoArray = await response.json();
    console.log(sessionInfoArray);
  
    // Sort the session info array by score in descending order
    sessionInfoArray.sort((a, b) => b.score - a.score);
  
    // Get the table body element
    const tableBody = document.getElementById("leaderboard");
  
    // Clear any existing rows from the table
    tableBody.innerHTML = "";
  
    // Iterate over the session info array and add a row for each entry
    for (const sessionInfo of sessionInfoArray) {
      // Create a new row for the table
      const row = tableBody.insertRow();
  
      // Add the username to the row
      const usernameCell = row.insertCell();
      usernameCell.textContent = sessionInfo.username;
      
  
      // Add the actual RGB value to the row
      const actualRgbCell = row.insertCell();
      actualRgbCell.textContent = `(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;
  
      // Add the color swatch to the row
      const actualSwatchCell = row.insertCell();
      actualSwatchCell.style.backgroundColor = `rgb(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;
      actualSwatchCell.style.width = "100px";
      actualSwatchCell.style.height = "100px";
      const actualColorName = await getColorName(sessionInfo.actualRGB);
      //actualSwatchCell.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${actualColorName}<div style="background-color: white; width: 20px; height: 20px; margin-left: 5px;"></div></div>`;
      actualSwatchCell.textContent = actualColorName;
      // Add the user RGB value to the row
      const userRgbCell = row.insertCell();
      userRgbCell.textContent = `(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;
  
      // Add the color swatch to the row
      const userSwatchCell = row.insertCell();
      userSwatchCell.style.backgroundColor = `rgb(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;
      userSwatchCell.style.width = "100px";
      userSwatchCell.style.height = "100px";
      const userColorName = await getColorName(sessionInfo.userRGB);
      userSwatchCell.textContent = userColorName;
      
      // Add the accuracy to the row
      const accuracyCell = row.insertCell();
      accuracyCell.textContent = `${(sessionInfo.score * 100).toFixed(2)}%`;
    }
  }

  async function createLeaderboardForUser(userName) {
    try {
      // Fetch the session info array for the specified user from the server
      const response = await fetch(`/getUserInfo/${userName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch session info: ${response.status} ${response.statusText}`);
      }
      const sessionInfoArray = await response.json();
      console.log("CREATELEADERBOARDFORUSER");
      console.log(sessionInfoArray);
  
      // Sort the session info array by score in descending order
      sessionInfoArray.sort((a, b) => b.score - a.score);
  
      // Get the table body element
      const tableBody = document.getElementById("user-scores");
  
      // Clear any existing rows from the table
      tableBody.innerHTML = "";
  
      // Iterate over the session info array and add a row for each entry
      for (const sessionInfo of sessionInfoArray) {
        // Create a new row for the table
        const row = tableBody.insertRow();
  
        // Add the username to the row
        const usernameCell = row.insertCell();
        usernameCell.textContent = sessionInfo.username;
  
        // Add the actual RGB value to the row
        const actualRgbCell = row.insertCell();
        actualRgbCell.textContent = `(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;
  
        // Add the color swatch to the row
        const actualSwatchCell = row.insertCell();
        actualSwatchCell.style.backgroundColor = `rgb(${sessionInfo.actualRGB[0]}, ${sessionInfo.actualRGB[1]}, ${sessionInfo.actualRGB[2]})`;
        actualSwatchCell.style.width = "100px";
        actualSwatchCell.style.height = "100px";
        const actualColorName = await getColorName(sessionInfo.actualRGB);
        actualSwatchCell.setAttribute('title', actualColorName);
  
        // Add the user RGB value to the row
        const userRgbCell = row.insertCell();
        userRgbCell.textContent = `(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;
  
        // Add the color swatch to the row
        const userSwatchCell = row.insertCell();
        userSwatchCell.style.backgroundColor = `rgb(${sessionInfo.userRGB[0]}, ${sessionInfo.userRGB[1]}, ${sessionInfo.userRGB[2]})`;
        userSwatchCell.style.width = "100px";
        userSwatchCell.style.height = "100px";
        const userColorName = await getColorName(sessionInfo.userRGB);
        userSwatchCell.setAttribute('title', userColorName);
  
        // Add the accuracy to the row
        const accuracyCell = row.insertCell();
        accuracyCell.textContent = `${(sessionInfo.score * 100).toFixed(2)}%`;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  async function getColorName(rgb) {
    const response = await fetch(`https://www.thecolorapi.com/id?rgb=${rgb.join(',')}`);
    if (!response.ok) {
      throw new Error(`Failed to get color name: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.name.value;
  }

createLeaderboard();



  