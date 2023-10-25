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


movieSelect.addEventListener('change', changeMainScreen);
