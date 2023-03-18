const listContainer = document.querySelector(".listthemMovies ul");
const pageCount = document.querySelector(".no-count");

const tabs = document.querySelectorAll(".mytabs a");

const genreListCont = document.querySelector(".genre-list-new");

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

tabs.forEach((item) => {
  item.addEventListener("click", () => {
    for (l of tabs) {
      l.classList.remove("tab-active");
    }
    item.classList.add("tab-active");
  });
});

const dateFormatter = function (date) {
  if (date) {
    const newDate = date.slice(0, 4);
    return newDate;
  }
};

const myApiKey = "c73159ae3e0b40cf0883d7a33c0fea7f";

let genHtml = "";
let categoryID;
let initialPage = 1;

// Get Genre List
const myGenre = async () => {
  const res = await fetch(
    ` https://api.themoviedb.org/3/genre/movie/list?api_key=c73159ae3e0b40cf0883d7a33c0fea7f`
  );
  const data = await res.json();

  const genres = data.genres;

  return genres;
};

myGenre().then((list) => {
  list.forEach((item) => {
    genHtml += `<li class="tvshowGenreList" data-id=${item.id}>${item.name}</li>`;
  });

  genreListCont.innerHTML = genHtml;

  const getCatID = document.querySelectorAll(".genre-list-new li");

  getCatID[0].classList.add("genactive");

  categoryID = getCatID[0].dataset.id;
});

myGenre();

const getMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=6b2dec73b6697866a50cdaef60ccffcb&sort_by=popularity.desc&include_adult=false&page=${initialPage}&with_genres=${categoryID}`
  );

  const data = await res.json();

  const moviesNew = data.results;

  let listHtml = "";

  moviesNew.forEach((item) => {
    listHtml += myMoviesHtml(item);
    listContainer.innerHTML = listHtml;
  });
};

getMovies();

// Get Number of movie pages

const currentMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${myApiKey}&sort_by=popularity.desc&include_adult=false&with_genres=${categoryID}`
  );
  const data = await res.json();
  let totalPages = data.total_pages;
  return totalPages;
};

currentMovies().then((topage) => {
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
  currentMovies().then((topage) => {
    if (initialPage < topage) {
      initialPage += 1;

      getMovies();

      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
      btnactiveState(initialPage, topage);
    }
  });

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

prevBtn.addEventListener("click", () => {
  currentMovies().then((topage) => {
    if (initialPage > 1) {
      initialPage -= 1;
      getMovies();

      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
      btnactiveState(initialPage, topage);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  });
});

genreListCont.addEventListener("click", (e) => {
  let elem = e.target;

  if (elem.classList.contains("tvshowGenreList")) {
    const eachGen = document.querySelectorAll(".genre-list-new li");
    eachGen.forEach((genre) => {
      genre.classList.remove("genactive");
    });

    elem.classList.add("genactive");

    categoryID = elem.dataset.id;
    initialPage = 1;
    getMovies();

    currentMovies().then((topage) => {
      pageCount.innerHTML = `<p> ${initialPage} of ${topage}</p>`;
    });
  }
});

const myMoviesHtml = (mov) => {
  let url = "./moviedetail.html?id=" + encodeURIComponent(mov.id);
  return ` <li>
    <a href=${url} class="posterlink"><img src="https://image.tmdb.org/t/p/w500/${
    mov.poster_path
  }"
           alt="${mov.title}" class="poster" data-id="${mov.id}"
           onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
           loading="lazy" alt="${mov.title}"></a>

    <div class="details">
       <p class="movietitle">${mov.title}</p>
       <div class="info">
           <p class="year">${dateFormatter(mov.release_date)}</p>
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
               <div class="category">MOVIE</div>
           </div>
       </div>
   </li>`;
};
