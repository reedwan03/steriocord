const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

const searchMovies = document
  .querySelector(".search")
  .addEventListener("click", () => {
    location.replace("./search.html");
  });