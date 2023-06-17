const tvShowGenreList = document.querySelector(".showgenrre");
const tvShowListCont = document.querySelector(".listShows ul");
const pageCount = document.querySelector(".no-count");

const genCont = document.querySelectorAll(".showgenrre li");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

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

const myApiKey = "c74f98f205cab4c2d3f6c1ff1729ff4d";

let genHtml = "";
let categoryID;
let initialPage = 1;

const myGenre = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${myApiKey}&language=en-US`
  );

  const data = await res.json();

  const tvGenres = data.genres;

  tvGenres.forEach((item) => {
    genHtml += `<li class="tvshowGenreList" data-id=${item.id}>${item.name}</li>`;
  });

  tvShowGenreList.innerHTML = genHtml;

  const getCatID = document.querySelectorAll(".showgenrre li");

  getCatID[0].classList.add("genactive");

  categoryID = getCatID[0].dataset.id;
};

myGenre();

const tvShowLists = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=6b2dec73b6697866a50cdaef60ccffcb&language=en-US&page=${initialPage}&with_genres=${categoryID}`
  );

  const data = await res.json();

  const tvLists = data.results;

  let listHtml = "";

  tvLists.forEach((movie) => {
    listHtml += myTVHtml(movie);
    tvShowListCont.innerHTML = listHtml;
  });
};

tvShowLists();

const tvListPages = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${myApiKey}&sort_by=popularity.desc&include_adult=false&with_genres=${categoryID}`
  );
  const data = await res.json();
  let totalPages = data.total_pages;

  return totalPages;
};

tvListPages().then((topage) => {
  pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
});

const btnactiveState = (ini, tot) => {
  if (ini == 1) {
    prevBtn.classList.add("noclick");
  } else if (ini > 1) {
    prevBtn.classList.remove("noclick");
  } else if (ini == tot) {
    nextBtn.classList.add("noclick");
  }
};

nextBtn.addEventListener("click", () => {
  tvListPages().then((topage) => {
    if (initialPage < topage) {
      initialPage += 1;

      tvShowLists();

      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
      btnactiveState(initialPage, topage);
    }
  });

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

prevBtn.addEventListener("click", () => {
  tvListPages().then((topage) => {
    if (initialPage > 1) {
      initialPage -= 1;
      tvShowLists();

      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
      btnactiveState(initialPage, topage);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  });
});

tvShowGenreList.addEventListener("click", (e) => {
  let elem = e.target;

  if (elem.classList.contains("tvshowGenreList")) {
    const eachGen = document.querySelectorAll(".showgenrre li");
    eachGen.forEach((genre) => {
      genre.classList.remove("genactive");
    });

    elem.classList.add("genactive");

    categoryID = elem.dataset.id;
    initialPage = 1;

    tvShowLists();

    tvListPages().then((topage) => {
      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
    });
  }
});

const myTVHtml = (mov) => {
  let url = "./tvshowdetails.html?id=" + encodeURIComponent(mov.id);
  return ` <li>
      <a href=${url} class="posterlink"><img src="https://image.tmdb.org/t/p/w500/${
    mov.poster_path
  }"
             alt="${mov.original_name || mov.name}" class="poster" data-id="${
    mov.id
  }"
             onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
             loading="lazy" alt="${mov.original_name || mov.name}"></a>
  
      <div class="details">
         <p class="movietitle">${mov.original_name || mov.name}</p>
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
                                 fill: white;
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

const dateFormatter = function (date) {
  if (date) {
    const newDate = date.slice(0, 4);
    return newDate;
  }
};
