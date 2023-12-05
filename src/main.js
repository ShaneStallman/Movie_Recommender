async function getGenres(){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e88a0805d4mshe025932791973e2p131fcbjsn2e209adf7d6b',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return result;
    } catch (error) {
        return error;
    }
}
getGenres().then(genres => console.log(genres)).catch(error => console.error(error));

async function getRandom(){
const url = 'https://moviesdatabase.p.rapidapi.com/titles/random';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e88a0805d4mshe025932791973e2p131fcbjsn2e209adf7d6b',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	return result;
} catch (error) {
	return error;
}
}

getRandom().then(random => console.log(random)).catch(error => console.error(error));


const movieInput = document.getElementById("input");
const movieSwitch = document.getElementById("mvSwitch");
const TVSwitch = document.getElementById("tvSwitch");
const movieGridDisplay = document.getElementById("movieGridDisplay");
const infoDisplay = document.getElementById("infoDisplay");
const backButton = document.getElementById("back");
let infoDisplaySwitcher = false;
let switcher = true; 

movieSwitch.addEventListener('click', (event) => {
    switcher = true;
    movieInput.placeholder = "Find Similar Movies To...";
    console.log(switcher);
});

TVSwitch.addEventListener('click', (event) => {
    switcher = false;
    movieInput.placeholder = "Find Similar TV Series To...";
    console.log(switcher);
});

backButton.addEventListener('click', (event) => {
    setDisplay();
});

function setDisplay(){
    if(infoDisplaySwitcher === false){
        infoDisplay.style.display = 'block';
        movieGridDisplay.style.display = 'none';
        infoDisplaySwitcher = true;
    }
    else if (infoDisplaySwitcher){
        infoDisplay.style.display = 'none';
        movieGridDisplay.style.display = 'block';
        infoDisplaySwitcher = false;
    }
}

const build = () => {
    const numCols = 5,
      numRows = 8,
      theGrid = document.getElementById('theGrid');
    for(let i = 0; i < numCols; i++){
      let col = document.createElement('div');
      col.classList.add('grid-col');
      theGrid.appendChild(col); 
      for(let j = 0; j < numRows; ++j){
       let newSquare = document.createElement('div');
       newSquare.classList.add('card'); 
       newSquare.addEventListener('click', (event) => setDisplay()); /*Change the screen to display movie info */
       let newImg = document.createElement('img');
       newImg.classList.add("cardImg");
       newImg.src = "https://upload.wikimedia.org/wikipedia/commons/0/03/Question_mark_grey.svg";
       newSquare.appendChild(newImg);
       col.appendChild(newSquare);
     }
   }
  };
  
  build();
  

