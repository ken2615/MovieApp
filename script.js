const movieContainer = document.querySelector("#movie-container");
const movieCardsWrapper = document.querySelector(".movie-cards-wrapper");
const movingMovieCards = document.querySelectorAll(".moving-movie-card");

const clonedMovieCards = movieCardsWrapper.cloneNode(true);
movieCardsWrapper.appendChild(clonedMovieCards);

let scrollAmount = 0;
const autoScrollSpeed = 1;
const cardSetWidth = movingMovieCards[0].clientWidth * movingMovieCards.length;

const autoScroll = () => {
  movieContainer.scrollLeft += autoScrollSpeed;
  scrollAmount += Math.abs(autoScrollSpeed);

  if (scrollAmount >= cardSetWidth) {
    movieContainer.scrollLeft = -5;
    scrollAmount = -5;
  }

  requestAnimationFrame(autoScroll);
};
requestAnimationFrame(autoScroll);

const apiKey = "150379be7bc75039ef61f51c9ba9615e";

async function fetchMovies(query, container) {
  container.innerHTML = "";
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
  const data = await response.json();

  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = "Search Results";
  categoryTitle.classList.add("category-title");
  container.appendChild(categoryTitle);

  const movieSearchContainer = document.createElement("div");
  container.appendChild(movieSearchContainer);
  displayMovies(data.results, movieSearchContainer);
  showSearchResults();
}

async function fetchMoviesByGenre(genre, container) {
  const genreId = await getGenreId(genre);
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );
  const data = await response.json();
  displayMovies(data.results, container);
}

async function getGenreId(genreName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
  const data = await response.json();
  const genre = data.genres.find((g) => g.name.toLowerCase() === genreName.toLowerCase());
  return genre ? genre.id : null;
}

function displayMovies(movies, container) {
  container.innerHTML = "";
  container.classList.add("movie-card-container");

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("api-movie-card");

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    moviePoster.alt = movie.title;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;

    const movieRating = document.createElement("p");
    movieRating.textContent = `Rating: ${movie.vote_average}`;

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieRating);
    movieCard.appendChild(moviePoster);

    const movieOverlay = document.createElement("div");
    movieOverlay.classList.add("movie-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    const overlayTitle = document.createElement("h3");
    overlayTitle.classList.add("overlay-title");
    overlayTitle.textContent = movie.title;

    const overlayDescription = document.createElement("p");
    overlayDescription.classList.add("overlay-description");
    overlayDescription.textContent = movie.overview;

    const overlayRating = document.createElement("p");
    overlayRating.classList.add("overlay-rating");
    overlayRating.textContent = `Rating: ${movie.vote_average}`;

    overlayContent.appendChild(overlayTitle);
    overlayContent.appendChild(overlayDescription);
    overlayContent.appendChild(overlayRating);
    movieOverlay.appendChild(overlayContent);
    movieCard.appendChild(movieOverlay);

    container.appendChild(movieCard);
  });
}


const categories = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Adventure", "Anime", "Thriller", "Animation", "Crime", "Fantasy", "Mystery", "Documentary", "Family", "History"];

categories.forEach((category, index) => {
  const categoryContainer = document.createElement("section");
  categoryContainer.id = `category-${index}`;
  document.querySelector("main").appendChild(categoryContainer);

  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = category;
  categoryTitle.classList.add("category-title");
  categoryContainer.appendChild(categoryTitle);

  const movieGridContainer = document.createElement("div");
  movieGridContainer.id = `movie-grid-container-${index}`;
  categoryContainer.appendChild(movieGridContainer);
  fetchMoviesByGenre(category, movieGridContainer);
});

const searchBtn = document.getElementById("searchBtn");
const searchInput =document.getElementById("searchInput");
const searchResultsContainer = document.querySelector("#search-results");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query.length > 0) {
    //const searchResultsContainer = document.querySelector("#search-results");
    fetchMovies(query, searchResultsContainer);

    // Show search results container and hide category containers
    showSearchResults();
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query.length > 0) {
     // const searchResultsContainer = document.querySelector("#search-results");
      fetchMovies(query, searchResultsContainer);

      // Show search results container and hide category containers
      showSearchResults();
    }
  }
});


const categoryBtns = document.querySelectorAll(".category-btn");
// debugger;
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    showCategoryResults(e.target.textContent);
  });
});

function showCategoryResults(category) {
  // debugger;
  // Hide all category containers
  const allCategoryContainers = document.querySelectorAll("section[id^=category]");
  allCategoryContainers.forEach((container) => {
    container.style.display = "none";
  });

  // Hide search results container
  searchResultsContainer.style.display = "none";

  // Show the clicked category container
  const categoryIndex = categories.indexOf(category);
  const clickedCategoryContainer = document.querySelector(`#category-${categoryIndex}`);
  clickedCategoryContainer.style.display = "block";
}


const backBtn = document.getElementById("backBtn");

 
backBtn.addEventListener("click", () => {
    showAllCategories();
  });
  
  function showAllCategories() {
    const allCategoryContainers = document.querySelectorAll("section[id^=category]");
     allCategoryContainers.forEach((container) => {
     container.style.display = "block";
    });
  }

function showSearchResults() {
  // Hide all category containers
  const allCategoryContainers = document.querySelectorAll("section[id^=category]");
  allCategoryContainers.forEach((container) => {
    container.style.display = "none";
  });

  // Show search results container
  searchResultsContainer.style.display = "block";
}