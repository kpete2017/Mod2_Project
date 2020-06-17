searchParams = new URLSearchParams(window.location.search)
searchUsername = searchParams.get("username")
searchPassword = searchParams.get("password")

let url = "http://localhost:3000/users"

if(searchParams) {
    url = `${url}?username=${searchUsername}&password=${searchPassword}`
}

fetch(url)
    .then(response => response.json())
    .then(userInfo => index(userInfo))

const list = document.getElementById("list")


function index(users) {
    // console.log(itemSearch)
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
    `<section>
        <h3>Welcome back ${user.name}!</h3>
        <form method="POST" action="http://localhost:3000/search_queries">
            <input name="name" type="text" placeholder="Search Anything">
            <input type="hidden" name="user_id" value="${user.id}">
            <input type="hidden" name="username" value="${user.username}">
            <input type="hidden" name="password" value="${user.password}">
            <input type="submit">
        </form>
    </section> `

    document.body.append(userHeader)
    console.log(user)

    searchQueries(user.search_queries, userHeader, user)
}

function searchQueries(sq, userHeader, user) {

    const querySec = document.createElement('section')
    querySec.id = "list-id"
    userHeader.append(querySec)
    counter = 0
    sq.forEach( query => {
        const queryList = document.createElement('li')
        queryList.innerHTML = `
        <h4>${query.name}</h4>
        <p class="category">${query.search_type}</p>
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
        infoButton.addEventListener("click", function(event) {handleEvent: moreInfoQuery(query, userHeader) })
        
        counter++
    }) 
}

function moreInfoQuery(query, userHeader){
    document.body.removeChild(userHeader)
    const info = document.createElement("section")
    info.innerHTML = `
    <p>${query.wTeaser}</p>
    <a href="${query.wUrl}">${query.wUrl}</a>
    <a href="${query.yUrl}">${query.yUrl}</a>
    `

    document.body.append(info)
}

function listRecommendations(query, userHeader, user){

    document.body.removeChild(userHeader)

    console.log(user.username)
    console.log(user.password)

    const recommendationHeader = document.createElement('main')
    document.body.append(recommendationHeader)
    recommendationHeader.innerHTML = `<h3>${query.name}</h3>`
    const recommendationSection = document.createElement('section')
    recommendationSection.id = "list-id" 
    recommendationHeader.append(recommendationSection)
    let counter = 0
    query.recommendations.forEach(recommendation => {
        const recommendationList = document.createElement('li') 
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
    })
}


function moreInfoRecomendationQuery(query, userHeader){
    document.body.removeChild(userHeader)
    const info = document.createElement("section")
    info.innerHTML = `
    <p>${query.wTeaser}</p>
    <a href="${query.wUrl}">${query.wUrl}</a>
    <a href="${query.yUrl}">${query.yUrl}</a>
    `

    document.body.append(info)
}
