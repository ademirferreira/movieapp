const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff04afe79c6ceabfb31731b2e1fc7ca4&language=pt-BR&page='

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=ff04afe79c6ceabfb31731b2e1fc7ca4&language=pt-BR&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
let page = 1

// Get initial movies
getMovies(API_URL + page)
async function getMovies(url) {
  const res = await fetch(url)

  const data = await res.json()
  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview} 
      </div>  
    `
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

next.addEventListener('click', (e) => {
  e.preventDefault()
  page++
  getMovies(API_URL + page)
  window.scrollTo(0, 0)
})

prev.addEventListener('click', (e) => {
  e.preventDefault()

  if (page === 1) {
    getMovies(API_URL + 1)
  } else {
    page--
    getMovies(API_URL + page)
  }
  window.scrollTo(0, 0)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchTerm = search.value
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})