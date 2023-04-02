const loader = document.querySelector(".loader");
const mobileMenu = document.querySelector(".mobile");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

const searchMovies = document
  .querySelector(".search")
  .addEventListener("click", () => {
    location.replace("./search.html");
  });

const hamburger = document
  .querySelector(".hamburger")
  .addEventListener("click", () => {
    mobileMenu.style.display = "flex";
  });

const close = document.querySelector(".close").addEventListener("click", () => {
  mobileMenu.style.display = "none";
});
