const API_KEY = "9b07ab3a-b5b6-4699-9d16-f80f47e3af08";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_TOP_COMING = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_CURRENT_PREMIRS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY"


getMovies(API_URL_POPULAR);
currentPremiers( API_URL_CURRENT_PREMIRS);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    console.log(respData)
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
               <div class="movie_category">${movie.genres.map(genre => `${genre.genre}`)}</div>
           
             </div>
            `;
        moviesEl.appendChild(movieEl);

    });
}

