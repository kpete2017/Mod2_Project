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
const navBar = document.getElementById("navbar")

function listUserQueries(user) {
    document.body.removeChild(main)
    const userHeader = document.createElement('main')
    const home = document.createElement("a")
    home.href = `UserPage.html?username=${user.username}&password=${user.password}`
    home.innerText = "Home"
    navBar.append(home)
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
        infoButton.addEventListener("click", function(event) {handleEvent: moreInfoQuery(query) })
        
        counter++
    }) 
}

function moreInfoQuery(query){
    fetch()
        .then(resp => resp.json())
        .then(result => console.log(result))
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
    query.recommendations.forEach(recommendation => {
        const recommendationList = document.createElement('li') 
        recommendationList.innerHTML = 
            `
            <h4>${recommendation.name}</h4>
            <button>More Info</button>
            <form method="POST" action="http://localhost:3000/search_queries">
                <input name="name" type="hidden" value="${recommendation.name}">
                <input type="hidden" name="username" value="${user.username}">
                <input type="hidden" name="password" value="${user.password}">
                <input type="hidden" name="user_id" value="${user.id}">
                <input type="submit" value="Add to Library">
            </form>
            `
        recommendationSection.append(recommendationList)

    })
}
