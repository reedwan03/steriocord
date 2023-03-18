const trendingMoviesCont = document.querySelector(".trendings ul");
const moviesForYouCont = document.querySelector(".movies-forr");

const tabs = document.querySelectorAll(".mytabs a");

const movieScroll = document.querySelector(".moviescroll");
const trendScroll = document.querySelector(".trendscroll");

const newPicksMov = document.querySelector(".movie-posters");

const allMovCont = document.querySelector(".movies-forr ul li");

const myApiKey = "c73159ae3e0b40cf0883d7a33c0fea7f";

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

const myBackdrops = [];

const imageContainer = document.querySelector(".imgg");

const searchMovies = document
  .querySelector(".search")
  .addEventListener("click", () => {
    location.replace("./search.html");
  });

const mobileMenu = document.querySelector(".mobile");

const hamburger = document
  .querySelector(".hamburger")
  .addEventListener("click", () => {
    mobileMenu.style.display = "flex";
  });

const close = document.querySelector(".close").addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

tabs.forEach((item) => {
  item.addEventListener("click", () => {
    for (l of tabs) {
      l.classList.remove("tab-active");
    }
    item.classList.add("tab-active");
  });
});

// GET MOVIES FOR YOU FROM MY API

const nowPlaying = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApiKey}&language=en-US`
  );
  const data = await res.json();

  const nowPlayingMovies = data.results;
  return nowPlayingMovies;
};

nowPlaying().then((movies) => {
  movies.forEach((movie) => {
    const movieList = nowPlayingHtml(movie);
    const dropImg = myBackdrops.push(movie.backdrop_path);

    movieScroll.insertAdjacentHTML("beforeend", movieList);

    const listBacks = bachtml(movie);

    imageContainer.insertAdjacentHTML("beforeend", listBacks);

    const slides = document.querySelectorAll(".imagee");
    let currSlide = 0;

    slides[currSlide].classList.add("move");

    setInterval(() => {
      // Hide the current slide
      slides[currSlide].classList.remove("move");

      // Move to the next slide
      currSlide++;

      // If we've reached the end, start over
      if (currSlide >= slides.length) {
        currSlide = 0;
      }

      // Show the next slide
      slides[currSlide].classList.add("move");
    }, 5000);
  });
});

const bachtml = (imgs) => {
  return `  <div class="backdrop-slide imagee">
  <img src="https://image.tmdb.org/t/p/original/${imgs.backdrop_path}" alt="Backdrop">
</div>`;
};

// GET upcoming from API

const newPicks = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${myApiKey}&language=en-US&page=1`
  );
  const data = await res.json();

  const newPickMov = data.results;

  return newPickMov;
};

newPicks().then((movies) => {
  const formov = movies.slice(0, 8);
  formov.forEach((movie) => {
    const listNewPicks = picksHtml(movie);

    newPicksMov.insertAdjacentHTML("beforeend", listNewPicks);
  });
});

// GET TRENDING MOVIES FROM MY API

const trendingMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${myApiKey}&language=en-US&page=1`
  );

  const data = await res.json();

  const myTrending = data.results;

  return myTrending;
};

trendingMovies().then((movies) => {
  movies.forEach((movie) => {
    const listTrendingMovies = trendingHtml(movie);

    trendScroll.insertAdjacentHTML("beforeend", listTrendingMovies);
  });
});

// FORMAT DATE

const dateFormatter = function (date) {
  if (date) {
    const newDate = date.slice(0, 4);
    return newDate;
  }
};

// RENDER MOVIES HTML

const nowPlayingHtml = (mov) => {
  let url = "./moviedetail.html?id=" + encodeURIComponent(mov.id);
  return ` <li>
  <div class="images">
  <a href=${url} class="posterlink">
  <img src="https://image.tmdb.org/t/p/w500/${mov.poster_path}"
          alt="${mov.title}" class="poster" data-id="${mov.id}"
          onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
          loading="lazy" alt="${mov.title || mov.name}">
          </a>
  </div>

  <div class="details">
      <p class="movietitle">${mov.title || mov.name}</p>
      <div class="info">
          <p class="year">${dateFormatter(
            mov.release_date || mov.first_air_date
          )}</p>
          <div class="likes">
              <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.0916772in"
                  height="0.0916772in" version="1.1"
                  style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                  viewBox="0 0 0.05 0.05" xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                  <defs>
                      <style type="text/css">
                          <![CDATA[
                          .fil0 {
                              fill: #ffff;
                              fill-rule: nonzero
                          }
                          ]]>
                      </style>
                  </defs>
                  <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer" />
                      <path class="fil0"
                          d="M0.02 0.01c0,-0.01 0.01,-0.01 0.01,-0.01 0.01,0 0.01,0.01 0.01,0.01 0,0.01 -0.01,0.02 -0.02,0.04 -0.01,-0.01 -0.02,-0.02 -0.02,-0.04 0,-0.01 0.01,-0.01 0.01,-0.01 0.01,0 0.01,0 0.01,0.01z" />
                  </g>
              </svg>
              ${mov.vote_average}
          </div>
          <div class="category">MOVIE</div>
      </div>
  </div>
</li>`;
};

// RENDER TRENDING HTML

const trendingHtml = (mov) => {
  let url = "./moviedetail.html?id=" + encodeURIComponent(mov.id);
  return ` <li>
  <div class="images">
  <a href=${url} class="posterlink">
  <img src="https://image.tmdb.org/t/p/w500/${mov.poster_path}"
          alt="${mov.title}" class="poster" data-id="${mov.id}"
          onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
          loading="lazy" alt="${mov.title || mov.name}">
          </a>
  </div>
  

  <div class="details">
      <p class="movietitle">${mov.title || mov.name}</p>
      <div class="info">
          <p class="year">${dateFormatter(
            mov.release_date || mov.first_air_date
          )}</p>
          <div class="likes">
              <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.0916772in"
                  height="0.0916772in" version="1.1"
                  style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                  viewBox="0 0 0.05 0.05" xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                  <defs>
                      <style type="text/css">
                          <![CDATA[
                          .fil0 {
                              fill: #E36414;
                              fill-rule: nonzero
                          }
                          ]]>
                      </style>
                  </defs>
                  <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer" />
                      <path class="fil0"
                          d="M0.02 0.01c0,-0.01 0.01,-0.01 0.01,-0.01 0.01,0 0.01,0.01 0.01,0.01 0,0.01 -0.01,0.02 -0.02,0.04 -0.01,-0.01 -0.02,-0.02 -0.02,-0.04 0,-0.01 0.01,-0.01 0.01,-0.01 0.01,0 0.01,0 0.01,0.01z" />
                  </g>
              </svg>
              ${mov.vote_average}
          </div>
          <div class="category">MOVIE</div>
      </div>
  </div>
</li>`;
};

// New Picks HTML
const picksHtml = (mov) => {
  let url = "./moviedetail.html?id=" + encodeURIComponent(mov.id);
  return `    <li>
  <div class="poster">
  <a href=${url} class="posterlink">
  <img src="https://image.tmdb.org/t/p/w500/${mov.poster_path}"
          alt="${mov.title}" class="poster" data-id="${mov.id}"
          onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
          loading="lazy" alt="${mov.title || mov.name}">
          </a>
  </div>
</li>`;
};

// Arrow Clicks Scrolls Horizontally for Movies Section

const arrLeft = document.querySelector(".arrow-movie-left");
const arrRight = document.querySelector(".arrow-movie-right");

arrRight.addEventListener("click", () => {
  movieScroll.scrollBy({ left: 300, behavior: "smooth" });
});

arrLeft.addEventListener("click", () => {
  movieScroll.scrollBy({ left: -300, behavior: "smooth" });
});

// Arrow Clicks Scrolls Horizontally for Trending Section

const trendLeft = document.querySelector(".arrow-trend-left");
const trendRight = document.querySelector(".arrow-trend-right");

trendRight.addEventListener("click", () => {
  trendScroll.scrollBy({ left: 300, behavior: "smooth" });
});

trendLeft.addEventListener("click", () => {
  trendScroll.scrollBy({ left: -300, behavior: "smooth" });
});

const myGenre = document.querySelectorAll(".genre-list ul li");
myGenre.forEach((item) => {
  item.addEventListener("click", (e) => {
    for (l of myGenre) {
      l.classList.remove("active");
    }
    item.classList.add("active");
  });
});
