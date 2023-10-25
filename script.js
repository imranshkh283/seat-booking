const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const theaterScreen = document.querySelector('.screen');
const movieDdrop = document.querySelector('movieDropDown');

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

let movieList = []

populateUI();

const getMovies = async (url) => {

    const response = await fetch(url);
    movieList = await response.json();

    movieList.results.forEach(res => {
        const optionElement = document.createElement('option');
        optionElement.value = res.id;
        optionElement.innerText = res.title;
        movieSelect.appendChild(optionElement);
    });
}

getMovies(APIURL);

const setMovieData = (movieIndex) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

    setMovieData(movieSelect.selectedIndex);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

const changeMainScreen = (e) => {

    const selectedMovie = movieSelect.value;
    console.log(selectedMovie);
    const selectedMovieData = movieList.results.find(ele => ele.id == selectedMovie);

    theaterScreen.style.backgroundImage = `url(${IMGPATH + selectedMovieData.poster_path})`;
    theaterScreen.style.backgroundSize = 'cover';
    theaterScreen.style.backgroundPosition = 'center';
    theaterScreen.style.backgroundRepeat = 'no-repeat';
    theaterScreen.style.backgroundAttachment = 'fixed';
    theaterScreen.style.backgroundBlendMode = 'multiply';

}


container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
})

updateSelectedCount();

movieSelect.addEventListener('change', changeMainScreen);
