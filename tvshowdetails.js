const trailerDiv = document.querySelector(".mov-trailer");
const movDetDiv = document.querySelector(".mynewhero");
const similarDiv = document.querySelector(".likescroll");
const backdropImg = document.querySelector(".backdrop");

const playMe = document.querySelector(".myplay");

const tabs = document.querySelectorAll(".mytabs a");

const newPicksMov = document.querySelector(".movie-posters");

const arrSimRight = document.querySelector(".arrow-like-right");
const arrSimLeft = document.querySelector(".arrow-like-left");

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

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

const myApiKey = "c73159ae3e0b40cf0883d7a33c0fea7f";

tabs.forEach((item) => {
  item.addEventListener("click", () => {
    for (l of tabs) {
      l.classList.remove("tab-active");
    }
    item.classList.add("tab-active");
  });
});

// FORMAT DATE

const dateFormatter = function (date) {
  if (date) {
    const newDate = date.slice(0, 4);
    return newDate;
  }
};

// get current url
let url = document.location.href;

// Get movie Id from Url
let fetchMovid = url.slice(url.indexOf("=") + 1);

// Embed trailer

const trailerFunction = (id) => {
  return `<iframe class="youtubePlayer" src="https://autoembed.to/trailer/tv/${id}" width="100%" height="100%" loading="lazy" frameborder="0" allowfullscreen></iframe>`;
};

// Get Current Movie Details from API

const currentMov = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${myApiKey}&language=en-US`
  );
  const data = await res.json();

  const currMov = data;

  console.log(data);

  return currMov;
};

// Load Movie Details
const loadMovies = () => {
  let trailerNow = trailerFunction(fetchMovid);
  trailerDiv.innerHTML = trailerNow;

  let backNow;

  let playnow;

  currentMov(fetchMovid).then((data) => {
    backNow = backdropHtml(data);
    backdropImg.innerHTML = backNow;
    movDetDiv.innerHTML = currMov(data);

    playnow = playBtn(data);
    playMe.innerHTML = playnow;
  });
};

loadMovies();

// Get Simllar Movies
const simMov = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${myApiKey}`
  );

  const data = await res.json();

  const similMov = data.results;

  return similMov;
};

simMov(fetchMovid).then((movies) => {
  movies.forEach((movie) => {
    const listSimilar = similarMovies(movie);

    similarDiv.insertAdjacentHTML("beforeend", listSimilar);
  });
});

// GET upcoming from API

const newPicks = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${myApiKey}&language=en-US&page=1`
  );
  const data = await res.json();

  const newPickMov = data.results;

  console.log(newPickMov);
  return newPickMov;
};

newPicks().then((movies) => {
  const formov = movies.slice(0, 8);
  formov.forEach((movie) => {
    const listNewPicks = picksHtml(movie);

    newPicksMov.insertAdjacentHTML("beforeend", listNewPicks);
  });
});

const playBtn = (mov) => {
  let url = `./tvseasons.html?/Z${+encodeURIComponent(
    mov.number_of_seasons
  )}-id=${+encodeURIComponent(mov.id)}`;

  return ` <span class="pplay">
  <a href=${url} class="plabtn">
  <ion-icon name="play-circle"></ion-icon>
</a>

  </span> `;
};

const backdropHtml = (mov) => {
  return `<img class="poster_big_img" src="https://image.tmdb.org/t/p/original/${mov.backdrop_path}" alt="">`;
};

const currMov = (mov) => {
  let url = `./tvseasons.html?/Z${+encodeURIComponent(
    mov.number_of_seasons
  )}-id=${+encodeURIComponent(mov.id)}`;

  document.title = `${mov.name} ${dateFormatter(
    mov.first_air_date
  )} | Steriocord`;

  let theGen = "";
  mov.genres.forEach((gen) => {
    theGen += `<li>${gen.name}</li>`;
  });

  return `

    <div class="moviedetailsection">

        <div class="mymovdet">
            <img src="https://image.tmdb.org/t/p/w500/${
              mov.poster_path
            }" alt="${mov.title}" class="poster" data-id="${mov.id}"
              onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
              loading="lazy" alt="${mov.name}">

            <div class="detailsnow">
                <div class="title">${mov.name}</div>
                <ul class="genres-lists">
                   ${theGen}
                </ul>
                <div class="other-det">
                    <div class="release"><b>Release date:</b>${dateFormatter(
                      mov.first_air_date
                    )}</div>
                    <div class="popu">

                        <b>Popularity:</b>${mov.popularity}
                    </div>
                </div>

                <div class="last">
                <div class="watch">
                    
                <ion-icon name="play-circle-outline"></ion-icon>
                    
                        <a href=${url} class="watchme"><div>Watch Now</div></a>

                     

                </div>

                <div class="season-count">
                ${mov.number_of_seasons} SEASON(S)
                </div>
                </div>
                
            </div>
        </div>

        <div class="about-movie">
            <p>${mov.overview}</p>
        </div>
    </div>`;
};

const similarMovies = (mov) => {
  let url = "./tvshowdetails.html?id=" + encodeURIComponent(mov.id);
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
     <p class="movietitle">${mov.name}</p>
     <div class="info">
         <p class="year">${dateFormatter(mov.first_air_date)}</p>
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
                             fill: #FFFFFF;
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
             <div class="category">TV SHOW</div>
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

arrSimLeft.addEventListener("click", () => {
  similarDiv.scrollBy({ left: -300, behavior: "smooth" });
});

arrSimRight.addEventListener("click", () => {
  similarDiv.scrollBy({ left: 300, behavior: "smooth" });
});
