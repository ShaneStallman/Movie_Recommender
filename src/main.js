import {MovieInfo, Rating} from './types.js';
import {showMovie} from './movieInfo.js';

let userWatchList = [];
const storedList = localStorage.getItem('myList');
if (storedList) {
    userWatchList = JSON.parse(storedList);
}
localStorage.setItem('myList', JSON.stringify(userWatchList));

const movieInput = document.getElementById("input");
const movieSwitch = document.getElementById("mvSwitch");
const TVSwitch = document.getElementById("tvSwitch");
const movieGridDisplay = document.getElementById("movieGridDisplay");
const infoDisplay = document.getElementById("infoDisplay");
const addDisplay = document.getElementById("infoDisplay2");
const backButton = document.getElementById("back");
const backButton2 = document.getElementById("back2");
const addButton = document.getElementById("add");
const feelingLucky = document.getElementById("lucky");
const favorite = document.getElementById("favorite");
const whatsNew = document.getElementById("new");
const genreSearch = document.getElementById("genreSearch");
const trending = document.getElementById("trend");

let infoDisplaySwitcher = false;
let addMovieDisplaySwitcher = false;
let switcher = true; 

const elements = document.querySelectorAll('.genreLink');

elements.forEach(element => {
  element.addEventListener('click', (event) => {
    console.log(element.textContent);
   setMovieInfoGenre(element.textContent);
  });
});

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
        addDisplay.style.display = 'none';
        infoDisplaySwitcher = true;
    }
    else if (infoDisplaySwitcher){
        infoDisplay.style.display = 'none';
        movieGridDisplay.style.display = 'block';
        addDisplay.style.display = 'none';
        infoDisplaySwitcher = false;
    }
}

function renderDisplay(movieArray){
    console.log(document.getElementById("0"));
    for(let i = 0; i < movieArray.length; i++){
       let curr = document.getElementById(i);
       let currImg = curr.querySelector(".cardImg");
       let currTitle = curr.querySelector(".cardTitle");
       currImg.style.display = 'block';
       currTitle.style.display = 'block';
       currImg.src = movieArray[i].image;
       currTitle.textContent = movieArray[i].title;
    }
    for(let j = movieArray.length; j < 20; j++){
        let curr = document.getElementById(j);
        let currImg = curr.querySelector(".cardImg");
        let currTitle = curr.querySelector(".cardTitle");
        currImg.style.display = 'none';
        currTitle.style.display = 'none';
    }
}

function addMovieDisplay(){
    if(addMovieDisplaySwitcher === false){
        infoDisplay.style.display = 'none';
        movieGridDisplay.style.display = 'none';
        addDisplay.style.display = 'block';
        addMovieDisplaySwitcher = true;
    }
    else if (addMovieDisplaySwitcher){
        infoDisplay.style.display = 'none';
        movieGridDisplay.style.display = 'block';
        addDisplay.style.display = 'none';
        addMovieDisplaySwitcher = false;
    }
}

const build = () => {
    let index = 0;
    const numCols = 5,
      numRows = 4,
      theGrid = document.getElementById('theGrid');
      setMovieInfoWhatsNew();
    for(let i = 0; i < numCols; i++){
      let col = document.createElement('div');
      col.classList.add('grid-col');
      theGrid.appendChild(col); 
      for(let j = 0; j < numRows; ++j){
       let newSquare = document.createElement('div');
       newSquare.classList.add('card'); 
       newSquare.addEventListener('click', async (event) => {
        let curr = document.getElementById(newSquare.id);
        let currTitle = curr.querySelector(".cardTitle").textContent;
        console.log(currTitle);
        let pressedInfo = await setMovieInfo(currTitle);
        loadInfo(pressedInfo);
        setDisplay();
        console.log(newSquare.classList.toString());
        }); /*Change the screen to display movie info */
       let newImg = document.createElement('img');
       newImg.classList.add("cardImg");
       newImg.src = "https://upload.wikimedia.org/wikipedia/commons/0/03/Question_mark_grey.svg";
       newSquare.appendChild(newImg);
       let newTitle = document.createElement('label');
       newTitle.textContent = "Temp Title";
       newTitle.classList.add("cardTitle");
       newSquare.appendChild(newTitle);
       index++;
       newSquare.id = (j * numCols + i);
       col.appendChild(newSquare);
     }
   }
  };
  
  build();
  
  function loadInfo(movieInfo){
    /* Load Image */
    document.getElementById("movieImg").src=movieInfo.image;
    let array = JSON.parse(localStorage.getItem('myList'));
    if(array.includes(movieInfo.title)){
        console.log(favorite.classList)
        console.log(favorite.classList.contains('fa-heart-o'))
        if(favorite.classList.contains('fa-heart-o')){
            favorite.classList.toggle('fa-heart-o');
            favorite.classList.toggle('fa-heart');
            favorite.style.fontSize = '45px';
            favorite.style.color = 'red';
        }
    }
    else{
        if(favorite.classList.contains('fa-heart')){
            favorite.classList.toggle('fa-heart');
            favorite.classList.toggle('fa-heart-o');
            favorite.style.fontSize = '45px';
            favorite.style.color = 'black';
        }
    }
    /** Load Info Object
     * Title
     * Director
     * Genre
     * Actor
     */
    document.getElementById("movieTitle").textContent = movieInfo.title + " (" + movieInfo.releaseDate.y + ")";
    document.getElementById("directorName").textContent = movieInfo.directors;
    document.getElementById("actorNames").textContent = movieInfo.castList;
    document.getElementById("summary").textContent = movieInfo.summary;
    document.getElementById("genres").textContent = movieInfo.genres;
    /** Load Ratings
     * 
     */
  }

addButton.addEventListener('click', () => {
    addMovieDisplay();
});

backButton2.addEventListener('click', (event) => {
    addMovieDisplay();
});

async function setMovieInfo(title){
    let pullMovie = await showMovie.getMovie(title);
    const dataUrl = pullMovie.information.image; // Your Data URL here
    const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

    let imageString = `data:image/png;base64,${base64String}`;
    let setMovie = new MovieInfo(
        pullMovie.information.type, 
        imageString, 
        pullMovie.information.title, 
        pullMovie.information.releaseDate, 
        pullMovie.information.genres, 
        pullMovie.information.castList, 
        pullMovie.information.directors, 
        pullMovie.information.summary,
        pullMovie.ratings);
    return setMovie;
}

async function setMovieInfoRandom(){
    let pullMovie = await showMovie.getRandom();
    const dataUrl = pullMovie.information.image; // Your Data URL here
    const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

    let imageString = `data:image/png;base64,${base64String}`;
    let setMovie = new MovieInfo(
        pullMovie.information.type, 
        imageString, 
        pullMovie.information.title, 
        pullMovie.information.releaseDate, 
        pullMovie.information.genres, 
        pullMovie.information.castList, 
        pullMovie.information.directors, 
        pullMovie.information.summary,
        pullMovie.ratings);
    return setMovie;
}

async function setMovieInfoWhatsNew(){
    let movieArray = await showMovie.getWhatsNew();
    let returnArray = [];
    for(let i = 0; i < movieArray.length; ++i){
        let pullMovie = movieArray[i];
        const dataUrl = pullMovie.information.image; // Your Data URL here
        const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

        let imageString = `data:image/png;base64,${base64String}`;
        let setMovie = new MovieInfo(
            pullMovie.information.type, 
            imageString, 
            pullMovie.information.title, 
            pullMovie.information.releaseDate, 
            pullMovie.information.genres, 
            pullMovie.information.castList, 
            pullMovie.information.directors, 
            pullMovie.information.summary,
            pullMovie.ratings);
        returnArray.push(setMovie);
        }
    console.log(returnArray);
    renderDisplay(returnArray);
}

async function setMovieInfoGenre(genre){
    let movieArray = await showMovie.getGenre(genre);
    console.log(movieArray)
    let returnArray = [];
    for(let i = 0; i < movieArray.length; ++i){
        let pullMovie = movieArray[i];
        const dataUrl = pullMovie.information.image; // Your Data URL here
        const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

        let imageString = `data:image/png;base64,${base64String}`;
        let setMovie = new MovieInfo(
            pullMovie.information.type, 
            imageString, 
            pullMovie.information.title, 
            pullMovie.information.releaseDate, 
            pullMovie.information.genres, 
            pullMovie.information.castList, 
            pullMovie.information.directors, 
            pullMovie.information.summary,
            pullMovie.ratings);
        returnArray.push(setMovie);
        }
    console.log(returnArray);
    renderDisplay(returnArray);
}

async function setMovieInfoMyList(list){
    let movieArray = await showMovie.getMyList(list);
    console.log(movieArray)
    let returnArray = [];
    for(let i = 0; i < movieArray.length; ++i){
        let pullMovie = movieArray[i];
        const dataUrl = pullMovie.information.image; // Your Data URL here
        const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

        let imageString = `data:image/png;base64,${base64String}`;
        let setMovie = new MovieInfo(
            pullMovie.information.type, 
            imageString, 
            pullMovie.information.title, 
            pullMovie.information.releaseDate, 
            pullMovie.information.genres, 
            pullMovie.information.castList, 
            pullMovie.information.directors, 
            pullMovie.information.summary,
            pullMovie.ratings);
        returnArray.push(setMovie);
        }
    console.log(returnArray);
    renderDisplay(returnArray);
}

async function setEditInfo(title, field, newValue){
    let movieArray = await showMovie.editMovie(title, field, newValue);
    console.log(movieArray)
    let returnArray = [];
    for(let i = 0; i < movieArray.length; ++i){
        let pullMovie = movieArray[i];
        const dataUrl = pullMovie.information.image; // Your Data URL here
        const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

        let imageString = `data:image/png;base64,${base64String}`;
        let setMovie = new MovieInfo(
            pullMovie.information.type, 
            imageString, 
            pullMovie.information.title, 
            pullMovie.information.releaseDate, 
            pullMovie.information.genres, 
            pullMovie.information.castList, 
            pullMovie.information.directors, 
            pullMovie.information.summary,
            pullMovie.ratings);
        returnArray.push(setMovie);
        }
    console.log(returnArray)
}

async function getSimilar(type, title){
    let movieArray = await showMovie.getSimilar(type, title);
    console.log(movieArray)
    let returnArray = [];
    for(let i = 0; i < movieArray.length; ++i){
        let pullMovie = movieArray[i];
        const dataUrl = pullMovie.information.image; // Your Data URL here
        const base64String = dataUrl.split(',')[1]; // Extract the Base64 portion after the comma

        let imageString = `data:image/png;base64,${base64String}`;
        let setMovie = new MovieInfo(
            pullMovie.information.type, 
            imageString, 
            pullMovie.information.title, 
            pullMovie.information.releaseDate, 
            pullMovie.information.genres, 
            pullMovie.information.castList, 
            pullMovie.information.directors, 
            pullMovie.information.summary,
            pullMovie.ratings);
        returnArray.push(setMovie);
        }
    console.log(returnArray)
    renderDisplay(returnArray);
}

document.getElementById("search").addEventListener('click', (event) => {
    let type = 0;
    if(switcher == true){
        type = 0;
    }
    if(switcher == false){
        type = 1;
    }
    let title = document.getElementById("input").value;
    getSimilar(type, title);
});

favorite.addEventListener('click', (event => {
    const currTitle = document.getElementById("movieTitle").textContent.substring(0, document.getElementById("movieTitle").textContent.indexOf('(')).trim();
    favorite.classList.toggle('fa-heart-o');
    favorite.classList.toggle('fa-heart');
    if(favorite.classList.contains('fa-heart-o')){
        favorite.style.fontSize = '45px';
        favorite.style.color = 'black';
        userWatchList = userWatchList.filter(item => item !== currTitle);
        localStorage.setItem('myList', JSON.stringify(userWatchList));
        console.log(userWatchList);
        console.log(localStorage.getItem('myList'));
    }
    if(favorite.classList.contains('fa-heart')){
        favorite.style.fontSize = '45px';
        favorite.style.color = 'red';
        userWatchList.push(currTitle);
        localStorage.setItem('myList', JSON.stringify(userWatchList));
        console.log(userWatchList);
        console.log(localStorage.getItem('myList'));
    }
}));

whatsNew.addEventListener('click', (event) => {
    setMovieInfoWhatsNew();
})

genreSearch.addEventListener('click', (event) => {
    setMovieInfoGenre("action");
})

trending.addEventListener('click', async (event) => {
   let info = await setMovieInfo("Barbie");
   loadInfo(info);
   setDisplay();
});

feelingLucky.addEventListener('click', async (event) => {
    let luckyMovie = await setMovieInfoRandom();
    loadInfo(luckyMovie);
    setDisplay();
});

const infoForm = document.getElementById("addForm");

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result); // Resolve with the Base64 string when successfully loaded
        };

        reader.onerror = (error) => {
            reject(error); // Reject with an error if something goes wrong
        };

        reader.readAsDataURL(file);
    });
 }
 

infoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const type = document.getElementById("typeSelect").value;
    const title = document.getElementById("titleInput").value;
    const releaseDate = document.getElementById("releaseDateInput").value;
    const directors = document.getElementById("directorInput").value;
    const castList = document.getElementById("mainCastInput").value;
    const genres = document.getElementById("genresInput").value;
    const summary = document.getElementById("summaryInput").value;
    const image = document.getElementById("fileInput");
    
    let dateArray = releaseDate.split('/');
    let m = dateArray[0];
    let d = dateArray[1];
    let y = dateArray[2];

    const imageFile = document.getElementById('fileInput').files[0];
    let base64 = null;
    await getBase64(imageFile)
    .then((base64String) => {
        base64 = base64String;
    })
    .catch((error) => {
        console.error('Error converting file to Base64:', error);
    });
    let movieObj = new MovieInfo(type, base64, title, {m,d,y}, genres, castList, directors, summary, []);
    showMovie.createNewMovie(movieObj);
    setDisplay();
});

const editImg = document.getElementById("imageChange");
const editText = document.getElementById("textChange");
const editType = document.getElementById("editSelect");
const editSubmit = document.getElementById("editSubmit");

editSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    let str = document.getElementById("movieTitle").textContent;
    let title = str.substring(0, str.indexOf('(')).trim();
    let fieldValue = document.getElementById("editSelect").value;
    console.log(fieldValue)
    let field = "";
    let newValue = "";
    if(fieldValue == 1){
        field = "title";
        newValue = editText.value;
    }
    if(fieldValue == 2){
        field = "directors";
        newValue = editText.value;
    }
    if(fieldValue == 3){
        field = "castList";
        newValue = editText.value;
    }
    if(fieldValue == 4){
        field = "summary";
        newValue = editText.value;
    }
    if(fieldValue == 5){
        field = "genres";
        newValue = editText.value;
    }
    if(fieldValue == 6){
        const imageFile = editImg.files[0];
        let base64 = null;
        await getBase64(imageFile)
        .then((base64String) => {
        base64 = base64String;
        })
        .catch((error) => {
        console.error('Error converting file to Base64:', error);
        });
        field = "image";
        newValue = base64;
    }
    
    console.log({title,field,newValue});
    let edits = await setEditInfo(title, field, newValue);
})

editType.addEventListener('change', (event) => {
    if(editType.value == 1){
        editImg.style.display = 'none';
        editText.style.display = 'block';
        editText.value = document.getElementById("movieTitle").textContent.substring(0, document.getElementById("movieTitle").textContent.indexOf('(')).trim();
    }
    if(editType.value == 2){
        editImg.style.display = 'none';
        editText.style.display = 'block';
        editText.value = document.getElementById("directorName").textContent;
    }
    if(editType.value == 3){
        editImg.style.display = 'none';
        editText.style.display = 'block';
        editText.value = document.getElementById("actorNames").textContent;
    }
    if(editType.value == 4){
        editImg.style.display = 'none';
        editText.style.display = 'block';
        editText.value = document.getElementById("summary").textContent;
    }
    if(editType.value == 5){
        editImg.style.display = 'none';
        editText.style.display = 'block';
        editText.value = document.getElementById("genres").textContent;
    }
    if(editType.value == 6){
        editImg.style.display = 'block';
        editText.style.display = 'none';
    }
});

document.getElementById("closeEdit").addEventListener('click', (event) => {
    document.getElementById("myForm").style.display = "none";
});

document.getElementById("openEdit").addEventListener('click', (event) => {
    document.getElementById("myForm").style.display = "block";
});

document.getElementById("myListLink").addEventListener('click', (event) => {
    console.log(JSON.parse(localStorage.getItem('myList')));
    setMovieInfoMyList(JSON.parse(localStorage.getItem('myList')));
})

document.getElementById("addRating").addEventListener('click', (event) => {
    document.getElementById("ratingForm").style.display = "block"
});

document.getElementById("closeRating").addEventListener('click', (event) => {
    document.getElementById("ratingForm").style.display = "none"
});

document.getElementById("ratingSubmit").addEventListener('click', async (event) => {
    event.preventDefault();
    let str = document.getElementById("movieTitle").textContent;
    let title = str.substring(0, str.indexOf('(')).trim();
    let stars = document.getElementById("stars").value;
    let review = document.getElementById("reviewText").value;
    let tags = document.getElementById("tags").value;
    let author = "Anonymous";
    let ratings = await showMovie.addRating(title, {stars, review, tags, author});
    console.log(ratings)
})


