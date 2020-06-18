let searchParams = new URLSearchParams(window.location.search)
let searchUsername = searchParams.get("username")
let searchPassword = searchParams.get("password")
let searchError = searchParams.get("error")
let searchType = searchParams.get("search_type")
let url = "http://localhost:3000/users"


if(searchParams) {
    url = `${url}?username=${searchUsername}&password=${searchPassword}`
    if(searchError) {
        alert("This was a bad request. Either the API gave a bad request or it was misspelled")
    }
}

fetch(url)
    .then(response => response.json())
    .then(userInfo => index(userInfo))

const list = document.getElementById("list")


function index(users) {

    users.forEach( user => {
        listUserQueries(user)
    })
}

const main = document.querySelector("main")
const navBar = document.getElementById("button")

function listUserQueries(user) {
    document.body.removeChild(main)
    const userHeader = document.createElement('main')
    const home = document.createElement("a")
    const logoutButton = document.createElement("a")
    logoutButton.href = `index.html`
    logoutButton.innerText = "Logout"
    home.href = `UserPage.html?username=${user.username}&password=${user.password}`
    home.innerText = "Home"
    navBar.append(home)
    navBar.append(logoutButton)
    userHeader.innerHTML = 
    `<section id="header">
        <h3>Welcome back ${user.name}!</h3>
        <form class="filter-form" action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="music">
            <input class="filter-input" id="music-input"type="submit" value="">
        </form>
        <form class="filter-form" action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="movie">
            <input class="filter-input" id="movie-input" type="submit" value="">

        </form>
        <form class="filter-form" action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="show">
            <input class="filter-input" id="show-input" type="submit" value="">
        </form>
        <form class="filter-form" action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="book">
            <input class="filter-input" id="book-input"type="submit" value="">
        </form>
        <form class="filter-form" action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="game">
            <input class="filter-input" id="game-input"type="submit" value="">
        </form>

        <form method="POST" action="http://localhost:3000/search_queries">
            <input id="search-name" name="name" type="text" placeholder="Search your interests" size=50>
            <input type="hidden" name="user_id" value="${user.id}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <select id="search-type" name="search_type">
                <option value="music">Music</option>
                <option value="movie">Movie</option>
                <option value="show">Show</option>
                <option value="book">Book</option>
                <option value="game">Game</option>
            </select>
            <input id="search-submit" type="submit">
        </form>
    </section> `

    document.body.append(userHeader)

    searchQueries(user.search_queries, userHeader, user)
}

function searchQueries(sq, userHeader, user) {

    if (searchType) {
        sq = sq.filter( query => query.search_type === searchType )
        backgroundChanger()
    }

    const querySec = document.createElement('section')
    querySec.id = "list-id"
    userHeader.append(querySec)
    counter = 0
    sq.forEach( query => {
        const queryList = document.createElement('li')
        queryList.className = query.search_type
        queryList.innerHTML = `
        <h4>${query.name}</h4>
        <div id="card-info">
        <button id="info-button${counter}">More Info</button>
        </br>
        </br>
        <button id="rec-button${counter}">Recommendations</button>
        </br>
        </br>
        <form action="http://localhost:3000/search_queries/${query.id}" method = "POST">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type=submit value="Delete"/>
        </form>
        </div>`
        querySec.append(queryList)
        const recButton = document.getElementById(`rec-button${counter}`)
        const infoButton = document.getElementById(`info-button${counter}`)
        recButton.addEventListener("click", function(event) { handleEvent: listRecommendations(query, userHeader, user) })
        infoButton.addEventListener("click", function(event) { handleEvent: moreInfoQuery(query) })
        createIcon(query.search_type, queryList)
        infoButton.addEventListener("click", function(event) { handleEvent: moreInfoQuery(query, userHeader) })
        counter++
    }) 
}

function backgroundChanger() {
    
    const backgroundSetter = document.getElementById("background-setter")
    
    switch (searchType) {
        case "music":
            backgroundSetter.innerHTML = `    
            <style>
                body {
                background-image: url("/background_images/main_background.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                background-color: black;
                }
            </style>`
            break;
        case "movie":
            backgroundSetter.innerHTML = `    
            <style>
                body {
                background-image: url("/background_images/movie.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                background-color: black;
                }
            </style>`
            break;
        case "book":
            backgroundSetter.innerHTML = `    
            <style>
                body {
                background-image: url("/background_images/book.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                background-color: black;
                }
            </style>`
            break;
        case "show":
            backgroundSetter.innerHTML = `    
            <style>
                body {
                background-image: url("/background_images/show.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                }
            </style>`
            break;
        case "game":
            backgroundSetter.innerHTML = `    
            <style>
                body {
                background-image: url("/background_images/arcade-copy.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                }
            </style>`
            break;
        }
}


function createIcon(search_type, queryList){
    let iconDiv = document.createElement('div')
    iconDiv.className = "icon"
    switch (search_type) {
        case "music":
            iconDiv.innerHTML = "<img src='./icons/iconfinder_music_172510.png'>"
            break;
        case "movie":
            iconDiv.innerHTML = "<img src='./icons/movie-icon-png-1.png'>"
            break;
        case "book":
            iconDiv.innerHTML = "<img src='./icons/pngwing.com.png'>"
            break;
        case "show":
            iconDiv.innerHTML = "<img src='./icons/tv_icon.png'>"
            break;
        case "game":
            iconDiv.innerHTML = "<img class='game-icon' src='./icons/game-controller-icon.png'>"
            break;
    }
    queryList.append(iconDiv)
}

function moreInfoQuery(query, userHeader){
    document.body.removeChild(userHeader)
    const info = document.createElement("section")
    info.className = "info-class"
    info.innerHTML = `
    <h1>${query.name}</h1>
    <h2>Description:</h2>
    <p>${query.wTeaser}</p></br>
    <h2>Wikipedia</h2>
    <a href="${query.wUrl}">${query.wUrl}</a></br>
    <h2>Youtube</h2>
    <iframe width="560" height="315" src="${query.yUrl}"></iframe>
    `

    document.body.append(info)
}

function listRecommendations(query, userHeader, user){

    document.body.removeChild(userHeader)

    const recommendationHeader = document.createElement('main')
    document.body.append(recommendationHeader)
    recommendationHeader.innerHTML = `<section id="header"><h3>${query.name}</h3></section>`
    const recommendationSection = document.createElement('section')
    recommendationSection.id = "list-id" 
    recommendationHeader.append(recommendationSection)
    let counter = 0
    query.recommendations.forEach(recommendation => {
        const recommendationList = document.createElement('li') 
        recommendationList.className = recommendation.search_type
        recommendationList.innerHTML = 
            `
            <h4>${recommendation.name}</h4>
            <button id="info-button${counter}">More Info</button>
            <form method="POST" action="http://localhost:3000/search_queries">
                <input name="name" type="hidden" value="${recommendation.name}">
                <input type="hidden" name="username" value="${user.username}">
                <input type="hidden" name="password" value="${user.password}">
                <input type="hidden" name="user_id" value="${user.id}">
                <input type="submit" value="Add to Library">
            </form>
            `
        recommendationSection.append(recommendationList)
        const infoButton = document.getElementById(`info-button${counter}`)
        infoButton.addEventListener("click", function(event) {handleEvent: moreInfoRecomendationQuery(recommendation, recommendationHeader) })
        counter++
        createIcon(recommendation.search_type, recommendationList)
    })
}


function moreInfoRecomendationQuery(query, userHeader){
    document.body.removeChild(userHeader)
    const info = document.createElement("section")
    info.className = "info-class"
    info.innerHTML = `
    <h1>${query.name}</h1>
    <h2>Description:</h2>
    <p>${query.wTeaser}</p></br>
    <h2>Wikipedia</h2>
    <a href="${query.wUrl}">${query.wUrl}</a></br>
    <h2>Youtube</h2>
    <iframe width="560" height="315" src="${query.yUrl}"></iframe>
    `
    // <a href="${query.yUrl}">${query.yUrl}</a>

    document.body.append(info)
}
