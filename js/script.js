const currentPage = window.location.pathname
let searchState = {
  term: '',
  type: '',
  page: 1,
  totalPages: 1,
  totalResults: 0
}
let api = {
  apiKey: '50324ff81dc6859b6cb084b65e8086fd',
  apiUrl: 'https://api.themoviedb.org/3/'
}

function activeState(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if(link.getAttribute('href') == currentPage){
            link.classList.add('active')
        }
    })
}
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('backdrop'); // Add class for CSS control
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;

  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '110%';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.3';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}
// insert slider 
async function displaySlider() {
  const { results } = await getFromApi('movie/now_playing');

results.forEach((movie) => {
  const div = document.createElement('div');
  div.classList.add('swiper-slide');
  div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
    </h4>
  `;
  document.querySelector('.swiper-wrapper').appendChild(div);
});

// init only once after DOM is ready
initSwiper();

}
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 6000, // how long it takes to move one full slide
    autoplay: {
      delay: 0, // no waiting between slides
      disableOnInteraction: false,
    },
    freeMode: true,             // smooth, no snap
    freeModeMomentum: false,    // stops the bounce effect
    breakpoints: {
      500: { slidesPerView: 2 },
      700: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  });
}


// display TV shows
async function getShows(){
  const { results } = await getFromApi('tv/popular')
  results.forEach((show) => {
    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
            <div class="card">
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        </div>
    `
    document.querySelector('#popular-shows').appendChild(div)
  })

}
// display popular movies
async function getPopular() {
    const { results } = await getFromApi('movie/popular')
    results.forEach((movie) => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
                  <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `
        document.querySelector('#popular-movies').appendChild(div)
    })
}
// spinner
function showSpinner(){
  document.querySelector('.spinner').classList.add('show')
}
function hideSpinner(){
  document.querySelector('.spinner').classList.remove('show')
}
//display movie Details
async function getMovieDetails(){
  const movieId = window.location.search.split('=')[1]

  const movie = await getFromApi(`movie/${movieId}`)

  // insert backdrop
  displayBackgroundImage('movie', movie.backdrop_path)
  let div = document.createElement('div')
  div.innerHTML = `
  <div class="details-top">
          <div>
  <img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    alt="${movie.title}"
    class="poster"
  />

          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => 
                `<li>${genre.name}</li>`).join('')
              }
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span>${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span>${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies[0].name}, ${movie.production_companies[1].name}, ${movie.production_companies[2].name}</div>
        </div>
  `
  document.querySelector('#movie-details').appendChild(div)
  console.log(movie);
}
//display TV show Details
async function getShowDetails(){
  const showId = window.location.search.split('=')[1]

  const show = await getFromApi(`tv/${showId}`)

  // insert backdrop
  displayBackgroundImage('show', show.backdrop_path)
  let div = document.createElement('div')
  div.innerHTML = `
  <div class="details-top">
          <div>
  <img
  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
  alt="${show.name}"
  class="poster"
/>

          </div>
          <div>
<h2>${show.name}</h2>
<p class="text-muted">First Air Date: ${show.first_air_date}</p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => 
                `<li>${genre.name}</li>`).join('')
              }
            </ul>
            <a href="#" target="_blank" class="btn">Visit TV show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>TV show Info</h2>
          <ul>
              <li><span class="text-secondary">Episodes:</span> ${show.number_of_episodes}</li>
<li><span class="text-secondary">Seasons:</span> ${show.number_of_seasons}</li>
<li><span class="text-secondary">Runtime:</span> ${show.episode_run_time[0] || "N/A"} minutes</li>
<li><span class="text-secondary">Status:</span> ${show.status}</li>

          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies[0].name}, ${show.production_companies[1].name}, ${show.production_companies[2].name}</div>
        </div>
  `
  document.querySelector('#show-details').appendChild(div)
  console.log(show);
}
// search movies/shows
async function search(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  searchState.type = urlParams.get('type')
  searchState.term = urlParams.get('search-term')

  if(searchState.term !== '' && searchState.term !== null){
    let { results, total_pages, page, total_results } = await searchApi()
    if(results.length === 0){
      throwAlert('No results found')
      return
    }
    searchState.totalResults = total_results
    searchState.totalPages = total_pages
    displaySearch(results)

    document.querySelector('#search-term').value = ''

  }else{
    throwAlert('Please input the movie/show in the search bar')
  }
}
// display search results
function displaySearch(results){
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#pagination').innerHTML = ''
  document.querySelector('#search-results-heading').innerHTML = ''
  results.forEach((result) => {
    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
            <div class="card">
          <a href="${searchState.type}-details.html?id=${result.id}">
          ${
            result.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${searchState.type == 'movie' ? result.title :result.name}"
            />` : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${searchState.type == 'movie' ? result.title :result.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${searchState.type == 'movie' ? result.title :result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${searchState.type == 'movie' ? result.release_date :result.first_air_date}</small>
            </p>
          </div>
        </div>
    `
    document.querySelector('#search-results-heading').innerHTML = `
    <h2>${results.length} of ${searchState.totalResults} Results for ${searchState.term}</>
    `
    document.querySelector('#search-results').appendChild(div)
  })
  displayPagination()
}
// pagiantion
function displayPagination(){
  const div = document.createElement('div')
  div.classList.add('pagination')
  div.innerHTML= `
            <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${searchState.page} of ${searchState.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div)

  // disable prev btn
  if(searchState.page === 1){
    document.querySelector('#prev').disabled = true
  }

  //disable next btn
    if(searchState.page === searchState.totalPages){
    document.querySelector('#next').disabled = true
  }

  // next btn functionality
  document.querySelector('#next').addEventListener('click', async () => {
    searchState.page++
    const {results, total_pages} = await searchApi()
    displaySearch(results)
  })
  // prev btn functionality
  document.querySelector('#prev').addEventListener('click', async () => {
    searchState.page--
    const {results, total_pages} = await searchApi()
    displaySearch(results)
  })

}
// alert
function throwAlert(message){
  let alert = document.createElement('div')
  alert.classList.add('alert')
  let alertMessage = document.createTextNode(message)
  alert.appendChild(alertMessage)
  document.querySelector('#alert').appendChild(alert)

  setTimeout(() => alert.remove(), 3000)
}
// fetch from api
async function getFromApi(endpoint){
    const apiKey = api.apiKey
    const apiUrl = api.apiUrl
  showSpinner()
const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&language=en-US&page=1`)
    const data = await response.json()
  hideSpinner()
    return data
}
// search from api
async function searchApi(){
    const apiKey = api.apiKey
    const apiUrl = api.apiUrl
  showSpinner()
const response = await fetch(`${apiUrl}search/${searchState.type}?api_key=${apiKey}&language=en-US&page=${searchState.page}&query=${searchState.term}`)
    const data = await response.json()
  hideSpinner()
    return data
}

function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//initialize
function init() {
  switch (currentPage) {
    case '/':
    case '/index.html':
      displaySlider()
      getPopular()
      break;
    case '/shows.html':
      getShows()
      break;
    case '/movie-details.html':
      getMovieDetails()
      break;
    case '/tv-details.html':
      getShowDetails()
      break;
    case '/search.html':
      search()
      break;
  }

  activeState()
}

document.addEventListener('DOMContentLoaded', init)


class User {
  constructor(name, age){
    this.name = name
    this.age = age
  }

  createProfile(){

  }
  logOut(){

  }
}

let user1 = new User('elija', 17)
console.log(user1);
