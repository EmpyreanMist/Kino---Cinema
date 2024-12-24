import '@testing-library/jest-dom';
import jest from 'jest-mock';
import { movieCard } from "../movies.js";

// test for minutesHoursConverter()
describe("Converting minutes string to string in 'h timme m minuter'", () => {
    test("Test minutesToHoursConverter (argument 0 min) '", () => {
        const resultString = movieCard.minutesToHoursConverter('0 min');
        expect(resultString).toBe("0 timme 0 minuter");
    });

    test("Test minutesToHoursConverter with small values (argument 57 min) '", () => {
        const resultString = movieCard.minutesToHoursConverter('57 min');
        expect(resultString).toBe("0 timme 57 minuter");
    });

    test("Test minutesToHoursConverter with higher values(argument 189 min) '", () => {
        const resultString = movieCard.minutesToHoursConverter('189 min');
        expect(resultString).toBe("3 timme 9 minuter");
    });

    test("Test minutesToHoursConverter with extremely high values(argument 189 min) '", () => {
        const resultString = movieCard.minutesToHoursConverter('9999 min');
        expect(resultString).toBe("166 timme 39 minuter");
    });
});

// test append dom-element createMovieCard()
describe("Tests to check that every dom-element is implemented from createMovieCard function", () => {
    let container;

    beforeEach(() => {
        // Creates a empty div where the createMovieCard elements will be appended.
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Clears dom after every test
        document.body.innerHTML = '';
    });

    test('should create a movie card with the correct elements and classes', () => {
        const movieId = 'movvieId1';
        const url = 'https://example.com/movie.jpg';
        const title = 'An Awesome Movie';

        // Run function
        movieCard.createMovieCard(movieId, url, title, container);

        // Verify that moviWrapper was created
        const movieWrapper = container.querySelector('.movieWrapper');
        expect(movieWrapper).toBeInTheDocument();
        expect(movieWrapper.id).toBe(movieId);

        // Verify that img element is correctly created
        const movieImage = movieWrapper.querySelector('.movieImage');
        expect(movieImage).toBeInTheDocument();
        expect(movieImage.src).toBe(url);
        expect(movieImage.alt).toBe('a movie');

        // Verify that movieTitle is correctly appended to dom
        const movieTitle = movieWrapper.querySelector('.movieCardHeader');
        expect(movieTitle).toBeInTheDocument();
        expect(movieTitle.textContent).toBe(title);

        // Verify that movieBtn is added
        const movieBtn = movieWrapper.querySelector('.movieBtn');
        expect(movieBtn).toBeInTheDocument();

        const movieSpan = movieBtn.querySelector('.movieSpanBtn');
        expect(movieSpan).toBeInTheDocument();
        expect(movieSpan.textContent).toBe('Köp biljett');

        const movieIcon = movieBtn.querySelector('.fa-money-bill-wave');
        expect(movieIcon).toBeInTheDocument();
    });
});

// createMovieCardsFromArray
describe("Test to check that createMovieCardsFromArray is working", () => {
    let appendMovieCardTo;

    beforeEach(() => {
        //append cards to
        appendMovieCardTo = document.createElement('div');

        //Mock function createMovieCard to use in test createMovieCardsFromArray
        jest.spyOn(movieCard, "createMovieCard").mockImplementation(jest.fn());
    });

    afterEach(() => {
        movieCard.createMovieCard.mockClear();
    });

    it("should call createMovieCard for each element in the array with correct arguments", () => {

        //Array to call to the function to be tested
        const testArray = [
            {
                "id": 1,
                "comingSoon": false,
                "title": "Avatar",
                "releaseYear": 2009,
                "description": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                "trailer": "https://www.youtube.com/watch?v=5PSNL1qE6VY",
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
                "id": 2,
                "comingSoon": false,
                "title": "I Am Legend",
                "releaseYear": 2007,
                "description": "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
                "trailer": "https://www.youtube.com/watch?v=dtKMEAXyPkg",
                "image": "https://placecats.com/640/480",
                "rating": 7.2,
                "genre": "Drama, Horror, Sci-Fi",
                "runtime": "101 min",
                "rated": "PG-13",
                "director": "Francis Lawrence",
                "actors": "Will Smith, Alice Braga, Charlie Tahan, Salli Richardson-Whitfield",
                "language": "English"
            },
            {
                "id": 3,
                "comingSoon": false,
                "title": "300",
                "releaseYear": 2006,
                "description": "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.",
                "trailer": "https://www.youtube.com/watch?v=UrIbxk7idYA",
                "image": "https://placecats.com/640/480",
                "rating": 7.7,
                "genre": "Action, Drama, Fantasy",
                "runtime": "117 min",
                "rated": "R",
                "director": "Zack Snyder",
                "actors": "Gerard Butler, Lena Headey, Dominic West, David Wenham",
                "language": "English"
            }
        ];

        // call function to test
        movieCard.createMovieCardsFromArray(testArray, appendMovieCardTo);

        // Control cases
        expect(movieCard.createMovieCard).toHaveBeenCalledTimes(testArray.length);

        //check that createMovieCard has been called with correct arguments.
        expect(movieCard.createMovieCard).toHaveBeenCalledWith(
            1,
            "https://placecats.com/640/480",
            "Avatar",
            appendMovieCardTo
        );

        expect(movieCard.createMovieCard).toHaveBeenCalledWith(
            2,
            "https://placecats.com/640/480",
            "I Am Legend",
            appendMovieCardTo
        );

        expect(movieCard.createMovieCard).toHaveBeenCalledWith(
            3,
            "https://placecats.com/640/480",
            "300",
            appendMovieCardTo
        );
    });
});

//test appendInfoMovieModal
describe("appendInfoMovieModal", () => {
    let infoArray;

    beforeEach(() => {
        // Mock data för infoArray
        infoArray = [
            {
                "id": 1,
                "comingSoon": false,
                "title": "Avatar",
                "releaseYear": 2009,
                "description": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                "trailer": "https://www.youtube.com/embed/5PSNL1qE6VY",
                "image": "https://placecats.com/640/480",
                "rating": 7.9,
                "genre": "Action, Adventure, Fantasy",
                "runtime": "162 min",
                "rated": "PG-13",
                "director": "James Cameron",
                "actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
                "language": "English, Spanish"
            },
        ];

        // create mocked dom-structure movieModal
        document.body.innerHTML = `
            <section class="movieModalWrapper"></section>
        `;
    });

    it("should append movie content to the movie modal", () => {
        // call function
        const minutesToHoursConverter = jest.fn((minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`);
        const instance = {
            minutesToHoursConverter,
        };

        movieCard.appendInfoMovieModal.call(instance, infoArray);

        // movieModalWrapper contains movieContent
        const movieModal = document.querySelector("section.movieModalWrapper");
        const movieContent = movieModal.querySelector(".movieContent");
        expect(movieContent).toBeTruthy();

        // mediaWrapper contains trailer and image
        const mediaWrapper = movieContent.querySelector(".mediaWrapper");
        const movieTrailer = mediaWrapper.querySelector(".movieTrailer");
        const movieImg = mediaWrapper.querySelector(".movieImg");
        expect(movieTrailer.src).toBe(infoArray[0].trailer);
        expect(movieImg.src).toBe(infoArray[0].image);

        // left column contains details.
        const leftColumn = movieContent.querySelector(".leftColumn");
        const movieBtn = leftColumn.querySelector(".movieBtn");
        const extraInfo = leftColumn.querySelector(".extraInfo");
        expect(movieBtn).toBeTruthy();
        expect(extraInfo).toBeTruthy();

        // extraInfo contains correct information
        const releaseDesc = extraInfo.querySelector("dd.listInfo");
        expect(releaseDesc.innerHTML).toBe(String(infoArray[0].releaseYear));

        //Right column contains titel and description.
        const rightColumn = movieContent.querySelector(".rightColumn");
        const rightTitle = rightColumn.querySelector(".rightTitle");
        const descriptionContainer = rightColumn.querySelector(".descriptionContainer");
        expect(rightTitle.innerHTML).toBe(infoArray[0].title);
        expect(descriptionContainer.textContent).toContain(infoArray[0].description);

        // Runtime have been converted correctly
        expect(minutesToHoursConverter).toHaveBeenCalledWith(infoArray[0].runtime);
    });
});
