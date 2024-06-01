const moviesEl = document.querySelector(".movies");
const form = document.querySelector("form");
const favoriteBtn = document.querySelector(".favourites_btn");
const API_KEY = "9b07ab3a-b5b6-4699-9d16-f80f47e3af08";
const API_URL_DIGITAL =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY&page=1&releases=5";

let loadOnScroll = false;
let currentSection = "main";
let mainpageCount = 1;

function getRandomRating() {
  let randomNumber = (Math.random() * 0.7 + 0.3) * 10
  const multiplier = Math.pow(10, 1 || 0)
  randomNumber = Math.round(randomNumber * multiplier) / multiplier
  return randomNumber
}

let moviesIdArray = JSON.parse(localStorage.getItem('id')) ? JSON.parse(localStorage.getItem('id')) : []

//fetching data for main page
getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1&items=20`);

// fetching data for input value
form.addEventListener("submit", (e) => {
  e.preventDefault();
  moviesEl.innerHTML = "";
  let movieValue = form.querySelector("input").value;
  getInputMovies(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${movieValue}&page=1&films=5`
  );
  form.querySelector("input").value = "";
});
async function getInputMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log("maindata", respData);
  showInputMovies(respData);
}
function showInputMovies(data) {
  data.films.forEach((film) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("inputMovie");
    movieEl.innerHTML = `
            <div class="movie_cover-inner">
               <img
               src="${film.posterUrlPreview}" 
               class="movie_cover"
               alt="${film.nameRu}"
               />
               <div class="movie_cover--darkened"></div>
               </div>
                 <div class="movie_info">
                     <div class="info-top">
                        <h3 class="movie-rating"></h3> 
                         <div  class="heart" heart-data="${JSON.stringify(movie)}"  id="heart"></div> 
                   </div>
                 <div class="info-bottom">
                      <div class="movie_title">${film.nameRu}</div>
                      <div class="movie_category">${film.genres.map(
                      (genre) => `${genre.genre}`
    )}
                   </div>
                </div>  
              </div>
             </div>
            `;
    moviesEl.appendChild(movieEl);
  });
}

// addEvenListeners for current premiers, coming, best moviesEl, digital movies 

let currentPremiers = document
  .querySelector("#current_premiers")
  .addEventListener("click", (e) => {
    e.preventDefault();
    moviesEl.innerHTML = "";
    getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY&page=1&items=20`);
  });

let comimg = document
  .querySelector("#top_coming")
  .addEventListener("click", (e) => {
    e.preventDefault();
    moviesEl.innerHTML = "";
    getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1&items=20`);
  });
let bestMovies = document
  .querySelector("#top_best")
  .addEventListener("click", (e) => {
    e.preventDefault();
    moviesEl.innerHTML = "";
    getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1&items=20`);
  });

let digitalMovies = document
  .querySelector("#digital-releases")
  .addEventListener("click", (e) => {
    e.preventDefault();
    moviesEl.innerHTML = "";
    getDigitalMovies(`https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY&page=1&releases=5`);
  });

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log("maindata", respData);
  showMovies(respData);
}

function showMovies(data) {
     data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
           <div class="movie_cover-inner">
              <img
              src="${movie.posterUrlPreview}" 
             class="movie_cover"
             alt="${movie.nameRu}"
             />
              <div class="movie_cover--darkened"></div>
                 <div class="movie_info">
                     <div class="info-top">
                        <h3 class="movie-rating"></h3> 
                         <div  class="heart" heart-data="${JSON.stringify(movie)}" id="heart"></div> 
                   </div>
                 <div class="info-bottom">
                      <div class="movie_title">${movie.nameRu}</div>
                      <div class="movie_category">${movie.genres.map(
                      (genre) => `${genre.genre}`
    )}
                   </div>
                </div>  
             </div>
             
            `;
    moviesEl.appendChild(movieEl);
  });
}
async function getDigitalMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log("maindata", respData);
  showDigitMovies(respData);
}

// seperate function for showDigitMovies
function showDigitMovies(data) {
  data.releases.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
            <div class="movie_cover-inner">
              <img
              src="${movie.posterUrlPreview}" 
             class="movie_cover"
             alt="${movie.nameRu}"
             />
              <div class="movie_cover--darkened"></div>
            
             <div class="movie_info">
             <div class="info-top">
             <h3 class="movie-rating"></h3> 
              <div  class="heart" heart-data="${JSON.stringify(movie)}" id="heart"></div> 
              </div>
              <div class="info_bottom">
               <div class="movie_title">${movie.nameRu}</div>
               <div class="movie_category">${movie.genres.map(
              (genre) => `${genre.genre}`
                )} </div>
                 
                     </div>  
               </div>
               </div>
            `;
    moviesEl.appendChild(movieEl);
  });
}

// change heart

 moviesEl.addEventListener("click", (e)=>{
   if(e.target.id='heart'){
    e.target.classList.toggle("heart-active");
    const movieElement = e.target.closest('.movies')
    if(e.target.classList.contains("heart-active")){
       const heart = moviesEl.querySelector(".heart");
       const movie = JSON.parse(heart);
       heart.getAttribute('heart-data');
       addFavoriteMovie(movie);
    } else{
       alert("No selected movies");
    }
   }

})
 favoriteBtn.addEventListener("click",(e)=>{
  e.preventDefault();
   addFavoriteMovie();
 
 })
function addFavoriteMovie(movie){
  const favorites = getFavoriteMovies();
  if(!favorites.some(favorite =>favorite.filmId ===movie.kinopoiskId)){
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }
}
function getFavoriteMovies(){
  return JSON.parse(localStorage.getItem('favoriteMovies'))|| [];
}
function showFavoriteMovies(){
  const favorites = getFavoriteMovies();
   showMovies(favorites);

   
}
 
