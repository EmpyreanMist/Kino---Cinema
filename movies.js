/**
 * @module create movie cards module
 * @author Marcus
 */

const movieCard = {
    movieInformationArray: [],
    /**
     *
     * @param {*} movieId Will be used to append full information about the movie later.
     * @param {*} url The url that should be added to image element. (should be read from json).
     * @param {*} title The title to the card. Should be read from json.
     * @param {*} addMovieCardTo Which element the moviecard should be appended to.
     */

    createMovieCard(movieId, url, title, addMovieCardTo) {
        // create wrapper to contain moviecard
        const movieWrapper = document.createElement('article');
        movieWrapper.id = movieId;
        movieWrapper.classList.add('movieWrapper');

        // MovieImage
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
        movieBtn.classList.add('hoverEffect');

        // create span to append into movieBtn
        const movieSpan = document.createElement('span');
        movieSpan.classList.add('movieSpanBtn');
        movieSpan.innerHTML = 'Köp biljett';

        // Create i to add ticket icon into span
        const movieIcon = document.createElement('i');
        movieIcon.classList.add('fa-solid', 'fa-money-bill-wave');

        // append to movieBtn
        movieBtn.append(movieSpan);
        movieBtn.append(movieIcon);

        // append to movieWrapper
        movieWrapper.append(movieImage);
        movieWrapper.append(movieTitle);
        movieWrapper.append(movieBtn);

        // append movieWrapper to body
        addMovieCardTo.append(movieWrapper);
    },

    /**
     * Function to load create movie cards from the data in an array
     * @param {*} array Information to load data from.
     */

    createMovieCardsFromArray(array, appendMovieCardTo) {
        array.forEach(element => {
            this.createMovieCard(element.id, element.image, element.title, appendMovieCardTo);
        });
    },

    /**

     * Function to create clickevent to open movieModal
     * @param {*} movieArray Array to find all the information that matches the id from. 
     */
    clickEventMovieModal(movieArray) {
        const section = document.querySelectorAll('article.movieWrapper');

        section.forEach(movieCard => {
            movieCard.addEventListener('click', () => {
                const movieId = parseInt(movieCard.id);
                this.createMovieModal();

                // To append info to movie modal
                this.getInfoToMovieModal(movieId, movieArray);
            });
        });
    },

    /**
     * Function to create a movie modal.
     */
    createMovieModal() {
        // Create movie modal container
        const movieModal = document.createElement('section');
        movieModal.classList.add('movieModalWrapper');

        // Create exit button inside the modal
        const exitBtn = document.createElement('div');
        exitBtn.classList.add('exitBtn');
        exitBtn.innerHTML = 'X'; // You can use an icon here (e.g., <i class="fa-solid fa-xmark"></i>)

        // Append exit button to modal
        movieModal.append(exitBtn);

        // Append the modal to body
        document.body.append(movieModal);

        // Add event listener to exit button
        exitBtn.addEventListener('click', () => {
            this.exitMovieModal(movieModal); // Pass the modal to the exit function
        });
    },

    /**
     * Function to exit the movie modal by removing it from the DOM.
     */
    exitMovieModal(movieModal) {
        // Remove the movie modal from the DOM
        movieModal.remove();
    },
    /**
     * Function that dynamically append information to movie modal
     * @param {*} idValue To get info from specific movie.
     * @param {*} searchArray The array which to filter from when getting the information.
     */
    getInfoToMovieModal(idValue, searchArray) {
        // sort array with correct info about specific movie into array
        const modalMovie = searchArray.filter((movie) => movie.id == idValue);

        this.movieInformationArray = modalMovie;
        console.log(this.movieInformationArray);
        this.appendInfoMovieModal(this.movieInformationArray);
    },
    /**
     * Function to append information to modal box with.
     * @param {*} infoArray Array to read information from.
     */
    appendInfoMovieModal(infoArray) {
        // movie content
        const movieContent = document.createElement('article');
        movieContent.classList.add('movieContent');

        // Wrapper for trailer and img
        const mediaWrapper = document.createElement('div');
        mediaWrapper.classList.add('mediaWrapper');

        //trailer
        const movieTrailer = document.createElement('iframe');
        movieTrailer.classList.add('movieTrailer');
        movieTrailer.src = infoArray[0].trailer;

        //img
        const movieImg = document.createElement('img');
        movieImg.classList.add('movieImg');
        movieImg.src = infoArray[0].image;
        movieImg.alt = "";

        // append to mediaWrapper
        mediaWrapper.append(movieTrailer);
        mediaWrapper.append(movieImg);

        // container info
        const infoContainer = document.createElement('section');
        infoContainer.classList.add('movieInfoBox');

        // left column info
        const leftInfo = document.createElement('article');
        leftInfo.classList.add('leftColumn');

        // create button for movie cards
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movieBtn', 'modalBtn');

        // create span to append into movieBtn
        const movieSpan = document.createElement('span');
        movieSpan.classList.add('movieSpanBtn');
        movieSpan.innerHTML = 'Köp biljett';

        // Create i to add ticket icon into span
        const movieIcon = document.createElement('i');
        movieIcon.classList.add('fa-solid', 'fa-money-bill-wave');

        //append elements to movieBtn
        movieBtn.append(movieSpan);
        movieBtn.append(movieIcon);

        // Create extra details info
        const extraInfo = document.createElement('article');
        extraInfo.classList.add('extraInfo', 'visible');

        //extra info header
        const headerInfo = document.createElement('h2');
        headerInfo.classList.add('leftHeader');
        headerInfo.innerHTML = "Detaljer";

        // extra info content
        const infoList = document.createElement('dl');

        // Release
        const releaseHeader = document.createElement('dt');
        releaseHeader.classList.add('listHeader');
        releaseHeader.innerHTML = 'Premiär:';

        const releaseDesc = document.createElement('dd');
        releaseDesc.classList.add('listInfo');
        releaseDesc.innerHTML = infoArray[0].releaseYear;

        // Runtime
        const runtimeHeader = document.createElement('dt');
        runtimeHeader.classList.add('listHeader');
        runtimeHeader.innerHTML = 'Speltid:';

        const runDesc = document.createElement('dd');
        runDesc.classList.add('listInfo');
        runDesc.innerHTML = this.minutesToHoursConverter(infoArray[0].runtime);

        // Director
        const directorHeader = document.createElement('dt');
        directorHeader.classList.add('listHeader');
        directorHeader.innerHTML = 'Regi';

        const directorDesc = document.createElement('dd');
        directorDesc.classList.add('listInfo');
        directorDesc.innerHTML = infoArray[0].director;

        // Actors
        const actorHeader = document.createElement('dt');
        actorHeader.classList.add('listHeader');
        actorHeader.innerHTML = 'Skådespelare:';

        const actorDesc = document.createElement('dd');
        actorDesc.classList.add('listInfo');
        actorDesc.innerHTML = infoArray[0].actors;

        //Title
        const titleHeader = document.createElement('dt');
        titleHeader.classList.add('listHeader');
        titleHeader.innerHTML = 'Titel:';

        const titleDesc = document.createElement('dd');
        titleDesc.classList.add('listInfo');
        titleDesc.innerHTML = infoArray[0].title;

        //Genre
        const genreHeader = document.createElement('dt');
        genreHeader.classList.add('listHeader');
        genreHeader.innerHTML = 'Genre:';

        const genreDesc = document.createElement('dd');
        genreDesc.classList.add('listInfo');
        genreDesc.innerHTML = infoArray[0].genre;

        // Append toggle content to extraInfo
        const toggleContent = document.createElement('div');
        toggleContent.classList.add('toggleContent');

        toggleContent.append(actorHeader, actorDesc, titleHeader, titleDesc, genreHeader, genreDesc);

        // Append show more/less button
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggleButton');
        toggleButton.innerHTML = 'Show more';

        toggleButton.addEventListener('click', () => {
            if (toggleContent.style.display === 'none' || toggleContent.style.display === '') {
                toggleContent.style.display = 'block';
                toggleButton.innerHTML = 'Show less';
            } else {
                toggleContent.style.display = 'none';
                toggleButton.innerHTML = 'Show more';
            }
        });

        // Hide toggle content by default
        toggleContent.style.display = 'none';

        // append to info content
        infoList.append(releaseHeader);
        infoList.append(releaseDesc);

        //Runtime append
        infoList.append(runtimeHeader);
        infoList.append(runDesc);

        //Director append
        infoList.append(directorHeader);
        infoList.append(directorDesc);

        // append to extraInfo
        extraInfo.append(headerInfo);
        extraInfo.append(infoList);
        extraInfo.append(toggleContent);
        extraInfo.append(toggleButton);

        // append to left column info
        leftInfo.append(movieBtn);
        leftInfo.append(extraInfo);

        //right info container
        const rightInfo = document.createElement('article');
        rightInfo.classList.add('rightColumn');

        //h1 title
        const descTitle = document.createElement('h1');
        descTitle.classList.add('rightTitle');
        descTitle.innerHTML = infoArray[0].title;

        //Description and div
        const descDiv = document.createElement('div');
        descDiv.classList.add('descriptionContainer');

        const rightPara = document.createElement('p');
        rightPara.innerHTML = infoArray[0].description;

        descDiv.append(rightPara);

        //Append to right column info
        rightInfo.append(descTitle);
        rightInfo.append(descDiv);

        //append container info
        infoContainer.append(leftInfo);
        infoContainer.append(rightInfo);

        // append to movieContent
        movieContent.append(mediaWrapper);
        movieContent.append(infoContainer);

        // append to movie modal
        const movieModal = document.querySelector('section.movieModalWrapper');
        movieModal.append(movieContent);
    },
    /**
     * Funciton to convert minute into hours and minutes.
     * @param {*} minuteStr Takes argument in the format of (xxx min)
     * @returns {*} String in the form of "hours timme minutes minuter".
     */
    minutesToHoursConverter(minuteStr) {
        // Extract minutes from string
        const minutes = parseInt(minuteStr.split(' ')[0], 10);

        // convert minutes to hours and minutes
        const hours = Math.floor(minutes / 60);
        const min = minutes % 60;

        return `${hours} timme ${min} minuter`;
    }
};

export { movieCard };
