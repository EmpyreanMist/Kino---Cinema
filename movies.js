/**
 * @module create movie cards module
 * @author Marcus
 */

const movieCard = {
    /**
     * Function that creates a moviecard with diffrent classes to style from and then appends it to a specific element.
     * @param {*} url The url that should be added to image element. (should be read from json).
     * @param {*} title The title to the card. Should be read from json.
     * @param {*} addMovieCardTo Wich element the moviecard should be appended to.
     */
    createMovieCard (url, title, addMovieCardTo) {
        // create wrapper to contain moviecard
        const movieWrapper = document.createElement('article');
        movieWrapper.classList.add('movieWrapper');

        //MovieImage
        const movieImage = document.createElement('img');
        movieImage.classList.add('movieImage');
        movieImage.alt = "a movie";
        movieImage.src = url;

        // create header 2 for title
        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('movieCardHeader');
        movieTitle.innerHTML = title;

        // create button for movie cards
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movieBtn');

        // create span to append into movieBtn
        const movieSpan = document.createElement('span');
        movieSpan.classList.add('movieSpanBtn');
        movieSpan.innerHTML = 'Köp biljett';

        // Create i to add ticket icon into span
        const movieIcon = document.createElement('i');
        movieIcon.classList.add('fa-solid', 'fa-money-bill-wave');

        // append to index.hmtl
        //append elements to movieBtn
        movieBtn.append(movieSpan);
        movieBtn.append(movieIcon);

        //append to movieWrapper
        movieWrapper.append(movieImage);
        movieWrapper.append(movieTitle);
        movieWrapper.append(movieBtn);

        //append movieWrapper to body
        addMovieCardTo.append(movieWrapper);
    },
    /**
     * Function to load create movie cards from the data in an array
     * @param {*} array Information to load data from.
     */
    createMovieCardsFromArray (array, appendMovieCardTo) {

        array.forEach(element => {
            this.createMovieCard(element.image, element.title, appendMovieCardTo);
        });
    }
};

export { movieCard };
