

let RGBvals = [
    {red: 0, green: 0, blue: 0},
    {red: 0, green: 0, blue: 0},
  ];

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  
 

function setRGB() {
    const red = RandRGB();
    const blue = RandRGB();
    const green = RandRGB();

    RGBvals[0].red = red;
    RGBvals[0].green = green;
    RGBvals[0].blue = blue;
}
  function getRed() {
    const redVal = document.getElementById("r_value").value;
    RGBvals[1].red = parseInt(redVal);
    console.log(RGBvals)
  }

  function getBlue() {
    const blueVal = document.getElementById("b_value").value;
    RGBvals[1].blue = parseInt(blueVal);
    console.log(RGBvals)
  }

  function getGreen() {
    const greenVal = document.getElementById("g_value").value;
    RGBvals[1].green = parseInt(greenVal);
    console.log(RGBvals)
    
  }

