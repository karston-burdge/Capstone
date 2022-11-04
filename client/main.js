const gamesContainer = document.querySelector('#GamePostcontainer')
const form = document.querySelector('form')

const baseURL = `http://localhost:5001/api/games`

const videogamesCallback = ({ data: games }) => displayGames(games)
const errCallback = err => console.log(err.response.data)


let nav = document.querySelector("nav");
          window.onscroll = function() {
            if(document.documentElement.scrollTop > 20){
              nav.classList.add("sticky");
            }else {
              nav.classList.remove("sticky");
            }
          }

          
const getAllGamePosts = () => {
    axios.get(baseURL)
    .then(videogamesCallback)
    .catch(errCallback)
}
const createGame = (body) => {
    axios.post(baseURL, body)
    .then(videogamesCallback)
    .catch(errCallback)
}
const deleteGamePost = id => axios.delete(`${baseURL}/${id}`).then(videogamesCallback).catch(errCallback)
const updateGamePost = (id, type) => {
    axios.put(`${baseURL}/${id}`, {type})
    .then(videogamesCallback)
    .catch(errCallback)
}

function submitHandler(event) {
    event.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let review = document.querySelector('#review')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        review: review.value,
        imageURL: imageURL.value
    }

    createGame(bodyObj)

    title.value = ''
    rating.checked = false
    review.value = ''
    imageURL.value = ''
}

function createGamePost(game) {
    const gameCard = document.createElement('div')
    gameCard.classList.add('game-card')

    gameCard.innerHTML = `<img alt='game cover' src=${game.imageURL} class="game-cover"/>
    <p class="game-title">${game.title}</p>
    <div>
    <p class="game-review">${game.review}</p>
   
     </div>
    <div class="btns-container">
        <button onclick="updateGamePost(${game.id}, 'minus')">-</button>
        <p class="game-rating">${game.rating} Moths</p>
        <button onclick="updateGamePost(${game.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGamePost(${game.id})">delete</button>`


    GamePostcontainer.appendChild(gameCard)
}

function displayGames(arr) {
    GamePostcontainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGamePost(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGamePosts()

console.log("STILL A WORK IN PROGRESS, TRYING TO FIGURE OUT THE BEST WAY TO ADD A READ MORE BUTTON FOR THE TRUNCATED REVIEWS")