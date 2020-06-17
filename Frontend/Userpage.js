let searchParams = new URLSearchParams(window.location.search)
let searchUsername = searchParams.get("username")
let searchPassword = searchParams.get("password")
let searchType = searchParams.get("search_type")
let url = "http://localhost:3000/users"


if(searchParams) {
    url = `${url}?username=${searchUsername}&password=${searchPassword}`
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
        <form action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="music">
            <input type="submit" value="">
        </form>
        <form action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="movie">
            <input type="submit" value="">
        </form>
        <form action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="show">
            <input type="submit" value="">
        </form>
        <form action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="podcast">
            <input type="submit" value="">
        </form>
        <form action="http://localhost:3001/UserPage.html?username=${user.username}&password=${user.password}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="hidden" name="search_type" value="book">
            <input type="submit" value="">
        </form>

        <form method="POST" action="http://localhost:3000/search_queries">
            <input id="search-name" name="name" type="text" placeholder="Search Anything" size=50>
            <input type="hidden" name="user_id" value="${user.id}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input id="search-submit" type="submit">
        </form>
    </section> `

    document.body.append(userHeader)

    searchQueries(user.search_queries, userHeader, user)
}

function searchQueries(sq, userHeader, user) {

    
    if (searchType) {
        sq = sq.filter( query => query.search_type === searchType )
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
        <button id="info-button${counter}">More Info</button>
        <button id="rec-button${counter}">Recommendations</button>
        <form action="http://localhost:3000/search_queries/${query.id}" method = "POST">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type=submit value="Delete"/>
        </form>`
        querySec.append(queryList)
        const recButton = document.getElementById(`rec-button${counter}`)
        const infoButton = document.getElementById(`info-button${counter}`)
        recButton.addEventListener("click", function(event) {handleEvent: listRecommendations(query, userHeader, user) })
        infoButton.addEventListener("click", function(event) {handleEvent: moreInfoQuery(query) })
        createIcon(query.search_type, queryList)
        infoButton.addEventListener("click", function(event) {handleEvent: moreInfoQuery(query, userHeader) })
        counter++
    }) 
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
        case "podcast":
            iconDiv.innerHTML = "<img src='./icons/clipart2563313.png'>"
            break;
        case "book":
            iconDiv.innerHTML = "<img src='./icons/pngwing.com.png'>"
            break;
        case "show":
            iconDiv.innerHTML = "<img src='./icons/tv_icon.png'>"
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
    <a href="${query.yUrl}">${query.yUrl}</a>
    `

    document.body.append(info)
}

function listRecommendations(query, userHeader, user){

    document.body.removeChild(userHeader)

    const recommendationHeader = document.createElement('main')
    document.body.append(recommendationHeader)
    recommendationHeader.innerHTML = `<h3>${query.name}</h3>`
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
    <a href="${query.yUrl}">${query.yUrl}</a>
    `

    document.body.append(info)
}
