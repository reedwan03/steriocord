const myApiKey = "c73159ae3e0b40cf0883d7a33c0fea7f";

const resultCont = document.querySelector(".search-results");
const searchInput = document.querySelector(".mysearch");
const searchHead = document.querySelector(".search-header");

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};

const searchitem = async (srchquery) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${myApiKey}&language=en-US&query=${srchquery}&page=1`
  );
  const data = await res.json();
  const NowPlayingmovies = data.results;
  return NowPlayingmovies;
};

let searchVal = "";
searchInput.addEventListener("keyup", () => {
  let theHtml = "";

  searchVal = searchInput.value.trim();
  console.log(`search query: ${searchVal} (length: ${searchVal.length})`);
  if (searchVal === "") {
    searchHead.textContent = `What are you searching for❓`;
    resultCont.innerHTML = "";
  } else {
    searchHead.textContent = `Search Results for: ${searchVal.toUpperCase()}`;

    searchitem(searchVal).then((movs) => {
      movs.forEach((mov) => {
        if (mov.media_type == "tv" && mov.poster_path !== null) {
          theHtml += myTVHtml(mov);
        }

        if (
          mov.media_type == "movie" &&
          mov.poster_path !== null &&
          "release_date" in mov
        ) {
          theHtml += myMoviesHtml(mov);
        }

        resultCont.innerHTML = theHtml;
      });
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

window.onload = function () {
  searchInput.focus();
};
