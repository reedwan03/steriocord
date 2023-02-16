const trailerDiv = document.querySelector(".mov-trailer");
const movDetDiv = document.querySelector(".mynewhero");

// get current url
let url = document.location.href;

// Get movie Id from Url
let fetchMovid = url.slice(url.indexOf("=") + 1);

// Embed trailer

const trailerFunction = (ids) => {
  return `<iframe class="youtubePlayer" src="https://autoembed.to/trailer/movie/${ids}" width="100%" height="100%" loading="lazy" frameborder="0" allowfullscreen></iframe>`;
};

// Get Current Movie Details from API

const currentMov = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=c73159ae3e0b40cf0883d7a33c0fea7f&append_to_response=credits`
  );
  const data = await res.json();

  const currMov = data.results;

  return currMov;
};
// Load Movie Details

const loadMovies = () => {
  let trailerNow = trailerFunction(fetchMovid);
  trailerDiv.innerHTML = trailerNow;

  currentMov(fetchMovid).then((data) => {
    // movDetDiv.innerHTML = currMov(data);
    console.log(data);
    // Undefined
  });
};

loadMovies();

const movGenreList = (movs) => {
  for (let gen in movs) {
    var listss = (gen, movs[gen]);
    console.log(gen, movs[gen]);
    // return listss;
  }
};

const currMov = (mov) => {
  return `
    <div class="backdrop"></div>
    <div class="moviedetailsection">

        <div class="mymovdet">
            <img src="https://image.tmdb.org/t/p/w500/${
              mov.poster_path
            }" alt="${mov.title}" class="poster" data-id="${mov.id}"
              onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
              loading="lazy" alt="${mov.title || mov.name}">

            <div class="detailsnow">
                <div class="title">${mov.title}</div>
                <ul class="genres-lists">
                   ${movGenreList(mov.id)}
                </ul>
                <div class="other-det">
                    <div class="runtime"><b>Runtime:</b>${mov.runtime}</div>
                    <div class="release"><b>Release date:</b>${
                      mov.release_date
                    }</div>
                    <div class="popu">

                        <b>Popularity:</b>${mov.popularity}
                    </div>
                </div>
                <div class="watch">
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.183197in"
                            height="0.198622in" version="1.1"
                            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                            viewBox="0 0 0.19 0.21" xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                            <defs>
                                <style type="text/css">
                                    <![CDATA[
                                    .fil0 {
                                        fill: white
                                    }
                                    ]]>
                                </style>
                            </defs>
                            <g id="Layer_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <path class="fil0"
                                    d="M0.07 0.02l0.09 0.06c0.03,0.01 0.04,0.05 0,0.06l-0.1 0.06c-0.04,0.02 -0.06,0.02 -0.07,-0.01l0 -0.16c0,-0.02 0.03,-0.04 0.07,-0.01z" />
                            </g>
                        </svg>
                    </div>
                    <div class="watchme">Watch Now</div>

                </div>
            </div>
        </div>

        <div class="about-movie">
            <p>${mov.overview}</p>
        </div>
    </div>`;
};
