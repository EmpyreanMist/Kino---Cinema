import { movieCard } from "./movies.js";
import { movies } from "./getMovies.js";

// to decide where movieCards should be appended
const figureCard = document.querySelector("figure.movies");

//example array how to load data (will be changed to data from json-file)
const array = [
  {
    trailer: "https://www.youtube.com/embed/dtKMEAXyPkg",
    "id": 1,
    "comingSoon": false,
    "title": "Avatar",
    "releaseYear": 2009,
    "description": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "image": "https://placecats.com/640/480",
    "rating": 7.9,
    "genre": "Action, Adventure, Fantasy",
    "runtime": "162 min",
    "rated": "PG-13",
    "director": "James Cameron",
    "actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    "language": "English, Spanish"
  },
  {
    id: 2,
    image: "https://placecats.com/640/480",
    comingSoon: false,
    title: "Avatar",
    trailer: "https://www.youtube.com/embed/dtKMEAXyPkg"
  },
  {
    id: 3,
    image: "https://placecats.com/640/480",
    comingSoon: false,
    title: "Avatar",
    trailer: "https://www.youtube.com/embed/5PSNL1qE6VY"
  }
];

// create cards from all the elements in an array.
movieCard.createMovieCardsFromArray(array, figureCard);
// opens movie modal box from movie card.
movieCard.clickEventMovieModal(array);

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

document.getElementsByClassName("allMoviesBtn").addEventListener("click", function() {
    window.location.href = "moviesPage.html"; 
  });
  