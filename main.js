import { movieCard } from "./movies.js";
import { movies } from "./getMovies.js";

// to decide where movieCards should be appended
const figureCard = document.querySelector("figure.movies");

//example array how to load data (will be changed to data from json-file)
const array = [
  {
    image: "https://placecats.com/640/480",
    comingSoon: false,
    title: "Avatar",
  },
  {
    image: "https://placecats.com/640/480",
    comingSoon: false,
    title: "Avatar",
  },
  {
    image: "https://placecats.com/640/480",
    comingSoon: false,
    title: "Avatar",
  },
];

// create cards from all the elements in an array.
movieCard.createMovieCardsFromArray(array, figureCard);
// opens movie modal box from movie card.
movieCard.clickEventMovieModal();

// reads json file to diffrent arrays in movie objects.
movies.getAllMovies();
movies.getReleasedMovies();
movies.getUpcomingMovies();

// makes the arrays from the object global
let allMovies = movies.allMovies;
console.log(allMovies);
let released = movies.released;
let upcoming = movies.upcoming;
console.log(released);
console.log(upcoming);
