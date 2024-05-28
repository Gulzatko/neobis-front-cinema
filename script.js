const API_KEY = "9b07ab3a-b5b6-4699-9d16-f80f47e3af08";
const API_URL_ALL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_URL_CURRENT_PREMIRS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";

const API_URL_COMING =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1";
const API_URL_TOP_BEST =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";

const API_URL_DIGITAL = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY&page=1";
 
getMovies(API_URL_ALL);

let currentPremiers = document
  .querySelector("#current_premiers")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML= "";
    getMovies(API_URL_CURRENT_PREMIRS);
  });

let comimg = document
  .querySelector("#top_coming")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML= "";
    getMovies(API_URL_COMING);
  });
  let bestMovies = document
  .querySelector("#top_best").addEventListener("click",(e) =>{
    e.preventDefault();
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML= "";
    getMovies(API_URL_TOP_BEST);
  });

  let digitalMovies = document
  .querySelector("#digital-releases")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML= "";
    getDigitalMovies(API_URL_DIGITAL);
  });

  function searchApi(){
    document.querySelector(".header_search").addEventListener
  }

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
  const moviesEl = document.querySelector(".movies");
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
             </div>
             <div class="movie_info">
               <div class="movie_title">${movie.nameRu}</div>
               <div class="movie_category">${movie.genres.map(
                 (genre) => `${genre.genre}`
               )}
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

function showDigitMovies(data) {
  const moviesEl = document.querySelector(".movies");
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
             </div>
             <div class="movie_info">
               <div class="movie_title">${movie.nameRu}</div>
               <div class="movie_category">${movie.genres.map(
                 (genre) => `${genre.genre}`
               )}
               </div>
             </div>
            `;
    moviesEl.appendChild(movieEl);
  });
 
}
