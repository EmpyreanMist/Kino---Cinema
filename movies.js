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
     * @param {*} addMovieCardTo Wich element the moviecard should be appended to.
     */
    createMovieCard (movieId, url, title, addMovieCardTo) {

        // create wrapper to contain moviecard
        const movieWrapper = document.createElement('article');
        movieWrapper.id = movieId;
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
            this.createMovieCard(element.id, element.image, element.title, appendMovieCardTo);
        });
    },
    /**
     * Function to create clickevent to open movieModal
     * @param {*} movieArray Array to find all the information that matches the id from. 
     */
    clickEventMovieModal (movieArray) {
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
    createMovieModal () {
        const movieModal = document.createElement('section');
        movieModal.classList.add('movieModalWrapper');

        document.querySelector('body').append(movieModal);
    },
    /**
     * Function that dynamically append information to movie modal
     * @param {*} idValue To get info from specific movie.
     * @param {*} searchArray The array which to filter from when getting the information.
     */
    getInfoToMovieModal (idValue, searchArray) {
        // sort array with correct info about specific movie into array
        const modalMovie = searchArray.filter((movie) => movie.id == idValue);

        this.movieInformationArray = modalMovie;
        console.log(this.movieInformationArray);
        this.appendInfoMovieModal(this.movieInformationArray);
    },
    /**
     * Funciton to append information to modal box with.
     * @param {*} infoArray Array to read information from.
     */
    appendInfoMovieModal (infoArray) {
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
        movieBtn.classList.add('movieBtn');

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
        console.log(`${infoArray[0].releaseYear}`);
        releaseHeader.classList.add('listHeader');
        releaseHeader.innerHTML = 'Premiär:';
        /* release.innerHTML = `${infoArray[0].releaseYear}`; */

        const releaseDesc = document.createElement('dd');
        releaseDesc.classList.add('listInfo');
        releaseDesc.innerHTML = infoArray[0].releaseYear;

        // Runtime
        const runtimeHeader = document.createElement('dt');
        console.log(`${infoArray[0].releaseYear}`);
        runtimeHeader.classList.add('listHeader');
        runtimeHeader.innerHTML = 'Speltid:';
        /* release.innerHTML = `${infoArray[0].releaseYear}`; */

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
        console.log(`${infoArray[0].releaseYear}`);
        actorHeader.classList.add('listHeader');
        actorHeader.innerHTML = 'Skådespelare:';

        const actorDesc = document.createElement('dd');
        actorDesc.classList.add('listInfo');
        actorDesc.innerHTML = infoArray[0].actors;

        //Title
        const titleHeader = document.createElement('dt');
        console.log(`${infoArray[0].releaseYear}`);
        titleHeader.classList.add('listHeader');
        titleHeader.innerHTML = 'Titel:';

        const titleDesc = document.createElement('dd');
        titleDesc.classList.add('listInfo');
        titleDesc.innerHTML = infoArray[0].title;

        //Genre
        const genreHeader = document.createElement('dt');
        console.log(`${infoArray[0].releaseYear}`);
        genreHeader.classList.add('listHeader');
        genreHeader.innerHTML = 'Genre:';

        const genreDesc = document.createElement('dd');
        genreDesc.classList.add('listInfo');
        genreDesc.innerHTML = infoArray[0].genre;

        // append to info content
        infoList.append(releaseHeader);
        infoList.append(releaseDesc);

        //Runtime append
        infoList.append(runtimeHeader);
        infoList.append(runDesc);

        //Director append
        infoList.append(directorHeader);
        infoList.append(directorDesc);

        //Actor append
        infoList.append(actorHeader);
        infoList.append(actorDesc);

        //Title append
        infoList.append(titleHeader);
        infoList.append(titleDesc);

        //GenreAppend
        infoList.append(genreHeader);
        infoList.append(genreDesc);

        // append to extraInfo
        extraInfo.append(headerInfo);
        extraInfo.append(infoList);


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

        //create for exit div
        const exitDiv = document.createElement('div');
        exitDiv.classList.add('exitContainer');

        // append to movieContent
        movieContent.append(exitDiv);
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
    minutesToHoursConverter (minuteStr) {
        // Extract minutes from string
        const minutes = parseInt(minuteStr.split(' ')[0], 10);

        // convert minutes to hours and minutes
        const hours = Math.floor(minutes / 60);
        const min = minutes % 60;

        return `${hours} timme ${min} minuter`;
    }

};


export { movieCard };
