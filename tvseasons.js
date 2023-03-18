const listOfSeasons = document.querySelector(".no-seas");
const seasonUl = document.querySelector(".season-count");
const renderEpis = document.querySelector(".theepis");

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

const searchMovies = document
  .querySelector(".search")
  .addEventListener("click", () => {
    location.replace("./search.html");
  });

const tvTitle = document.querySelector("h1");

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

// get current url
let url = document.location.href;

// Get movie Id from Url
let fetchMovid = url.slice(url.indexOf("=") + 1);

// Get number of seasons from Tv SHOW Object
let myNoOfSeasons = Number(url.slice(url.indexOf("Z") + 1, url.indexOf("-")));

console.log(myNoOfSeasons);

const mySeasons = () => {
  let seaHtml = "";

  for (let i = 1; i < myNoOfSeasons + 1; i++) {
    seaHtml += `<li class="season">Season-${i}</li>`;
  }

  return `  <ul class="season-count">
 ${seaHtml}
</ul>`;
};

listOfSeasons.innerHTML = mySeasons();

const seaSons = document.querySelectorAll(".season-count li");

seaSons[0].classList.add("season-active");

listOfSeasons.addEventListener("click", (e) => {
  let elem = e.target;

  let elemNo = elem.innerText;

  const seasNo = elemNo.slice(elemNo.indexOf("-") + 1);

  if (elem.classList.contains("season")) {
    const eachSeason = document.querySelectorAll(".season");
    eachSeason.forEach((item) => {
      item.classList.remove("season-active");
    });

    elem.classList.add("season-active");
    renderEpis.innerHTML = "";
    seasonsNow(seasNo);
  }
});

const currTVShow = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${myApiKey}`
  );
  const data = await res.json();
  return data;
};

const CurrEpis = async (tv_id, currSea, currEpiso) => {
  let eachEpi;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tv_id}/season/${currSea}/episode/${currEpiso}?api_key=${myApiKey}`
  );

  const data = await res.json();

  eachEpi = epiNow(data);

  renderEpis.insertAdjacentHTML("beforeend", eachEpi);
};

const seasonsNow = (sea) => {
  renderEpis.innerHTML = "";

  currTVShow(fetchMovid).then((data) => {
    document.title = `${data.name | "Seasons"}`;

    tvTitle.innerText = data.name;

    let numseasons = data.seasons;

    const current = (seasonnn) => {
      numseasons.forEach(async (item) => {
        if (seasonnn == item.season_number) {
          let numOfEpis = item.episode_count;

          for (i = 1; i < numOfEpis + 1; i++) {
            await CurrEpis(fetchMovid, seasonnn, i);
          }
        }
      });
    };

    current(sea);
  });
};

seasonsNow(1);

const epiNow = (currs) => {
  return `<li class="tvepis">
  <div class="prevws">
      <a href=" https://www.2embed.to/embed/tmdb/tv?id=${fetchMovid}&s=${currs.season_number}&e=${currs.episode_number}" class="plabtn">
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
      </a>
      <img src="https://image.tmdb.org/t/p/w500/${currs.still_path}" alt="">
  </div>
  
  <div class="prev-det">
      <h3>${currs.episode_number}. </span> ${currs.name}</h3>
      <p>${currs.overview}</p>

      <div class="further">
      Episode Runtime: ${currs.runtime} Minutes
    </div>
  </div>

</li>
`;
};
