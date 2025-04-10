// Default array of movie objects
const defaultMovies = [
    { title: "The Shawshank Redemption", favorite: false },
    { title: "The Godfather", favorite: false },
    { title: "The Dark Knight", favorite: false },
    { title: "Pulp Fiction", favorite: false },
    { title: "Forrest Gump", favorite: false },
    { title: "Inception", favorite: false },
    { title: "Fight Club", favorite: false },
    { title: "The Matrix", favorite: false },
    { title: "Interstellar", favorite: false },
    { title: "Gladiator", favorite: false }
  ];
  
  // Attempt to load movies from local storage or use the default array
  let movies = JSON.parse(localStorage.getItem("movies")) || defaultMovies;
  
  // DOM elements for the two views
  const allMoviesSection = document.getElementById("all-movies");
  const favoritesSection = document.getElementById("favorites");
  
  // Navigation links
  const allMoviesLink = document.getElementById("all-movies-link");
  const favoritesLink = document.getElementById("favorites-link");
  
  // Function to save movies array to local storage
  function updateLocalStorage() {
    localStorage.setItem("movies", JSON.stringify(movies));
  }
  
  // Render movies to a specified container element
  function renderMovies(container, movieList) {
    container.innerHTML = "";
    if (movieList.length === 0) {
      container.innerHTML = "<p>No movies to display.</p>";
      return;
    }
    
    movieList.forEach((movie, index) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      
      // Movie title
      const title = document.createElement("span");
      title.className = "movie-title";
      title.textContent = movie.title;
      
      // Heart icon (using Unicode characters; toggles on click)
      const heart = document.createElement("span");
      heart.className = "heart-icon " + (movie.favorite ? "filled" : "outline");
      heart.textContent = movie.favorite ? "❤️" : "♡";
      
      heart.addEventListener("click", () => {
        // Toggle favorite status
        movie.favorite = !movie.favorite;
        // Save updated state to local storage
        updateLocalStorage();
        // Re-render the views based on which view is currently active
        if (allMoviesSection.style.display !== "none") {
          renderMovies(allMoviesSection, movies);
        } else {
          renderMovies(favoritesSection, movies.filter(m => m.favorite));
        }
      });
    
      card.appendChild(title);
      card.appendChild(heart);
      container.appendChild(card);
    });
  }
  
  // Initial render for the "All Movies" view
  renderMovies(allMoviesSection, movies);
  
  // Navigation event listeners to switch views
  allMoviesLink.addEventListener("click", (e) => {
    e.preventDefault();
    allMoviesLink.classList.add("active");
    favoritesLink.classList.remove("active");
    allMoviesSection.style.display = "block";
    favoritesSection.style.display = "none";
    renderMovies(allMoviesSection, movies);
  });
  
  favoritesLink.addEventListener("click", (e) => {
    e.preventDefault();
    favoritesLink.classList.add("active");
    allMoviesLink.classList.remove("active");
    allMoviesSection.style.display = "none";
    favoritesSection.style.display = "block";
    renderMovies(favoritesSection, movies.filter(movie => movie.favorite));
  });
  