import { movieCard } from "./movies.js";

// to decide where movieCards should be appended
const figureCard = document.querySelector('figure.movies');

//example array how to load data (will be changed to data from json-file)
const array = [
    {
        image: "https://placecats.com/640/480",
        comingSoon: false,
        title: "Avatar"
    },
    {
        image: "https://placecats.com/640/480",
        comingSoon: false,
        title: "Avatar"
    },
    {
        image: "https://placecats.com/640/480",
        comingSoon: false,
        title: "Avatar"
    }
];

// create cards from all the elements in an array.
movieCard.createMovieCardsFromArray(array, figureCard);