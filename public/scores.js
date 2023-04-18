   // Get the RGB values from the previous page
   const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"));
   const userName = sessionInfo[2].username;

   // Get the scores table body element
   const scoresTableBody = document.getElementById("scores-table-body");

   // Create a new row for the table
   const newRow = scoresTableBody.insertRow();

   // Add the username to the row
   const usernameCell = newRow.insertCell();
   usernameCell.textContent = userName;

   // Add the randomly generated RGB values to the row
   const randomRgbCell = newRow.insertCell();
   randomRgbCell.textContent = `(${sessionInfo[0].red}, ${sessionInfo[0].green}, ${sessionInfo[0].blue})`;

   // Add the color swatch to the row
   const colorSwatchCell = newRow.insertCell();
   colorSwatchCell.style.backgroundColor = `rgb(${sessionInfo[0].red}, ${sessionInfo[0].green}, ${sessionInfo[0].blue})`;
   colorSwatchCell.style.width = "100px";
   colorSwatchCell.style.height = "100px";
   

   let actualName = () => {
      let url = 'https://www.thecolorapi.com/id?rgb=' + sessionInfo[0].red + ',' + sessionInfo[0].green + ',' + sessionInfo[0].blue +  '&format=json';
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
   userInputRgbCell.textContent = `(${sessionInfo[1].red}, ${sessionInfo[1].green}, ${sessionInfo[1].blue})`;

   
  

   // Add the color swatch to the row
   const userSwatchCell = newRow.insertCell();
   userSwatchCell.style.backgroundColor = `rgb(${sessionInfo[1].red}, ${sessionInfo[1].green}, ${sessionInfo[1].blue})`;
   userSwatchCell.style.width = "100px";
   userSwatchCell.style.height = "100px";


   let userColor = () => {
      let url = 'https://www.thecolorapi.com/id?rgb=' + sessionInfo[1].red + ',' + sessionInfo[1].green + ',' + sessionInfo[1].blue +  '&format=json';
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
   accuracyCell.textContent = (sessionInfo[2].score*100) + "%";

