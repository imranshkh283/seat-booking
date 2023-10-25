const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const getMovies = async (url) => {

    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(res => {
        const optionElement = document.createElement('option');
        optionElement.value = res.id;
        optionElement.innerText = res.title;
        movieSelect.appendChild(optionElement);
    });
}


getMovies(APIURL);

