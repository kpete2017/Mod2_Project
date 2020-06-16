

const name = document.getElementById("submit-button")
name.addEventListener("click", function(event){ handleEvent: alert('Click listerner worked'), fetchUser()})

searchParams = new URLSearchParams(window.location.search)
searchUsername = searchParams.get("username")
searchPassword = searchParams.get("password")

let url = "http://localhost:3000/users"

if(searchParams) {
    url = `${url}?username=${searchUsername}&password=${searchPassword}`
}


fetchUser()

function fetchUser() {
    fetch(url)
        .then(response => response.json())
        .then(userInfo => index(userInfo))
}

const list = document.getElementById("list")


function index(users) {
    // console.log(itemSearch)
    users.forEach( user => {
        listUserQueries(user)
    })
}

main = document.querySelector("main")

function listUserQueries(user) {
    document.body.removeChild(main)
    const userHeader = document.createElement('main')
    userHeader.innerHTML = 
        `<section>
            <form method="POST" action="http://localhost:3000/search_queries">
                <input name="name" type="text" placeholder="Search Anything">
                <input type="hidden" name="user_id" value="${user.id}">
                <input type="submit">
            </form>
        </section>
        <h3>${user.name}</h3>`

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
        <p>${query.name}</p>
        <p class="category">${query.search_type}</p>
        <button id="info-button${counter}">More Info</button>
        <button id="rec-button${counter}">Recommendations</button>
        <form action="http://localhost:3000/search_queries/${query.id}" method = "POST">
            <input type="hidden" name="_method" value="DELETE">
            <input type=submit value="Delete"/>
        </form>`
        querySec.append(queryList)
        const recButton = document.getElementById(`rec-button${counter}`)
        console.log(recButton)
        recButton.addEventListener("click", function(event) {handleEvent: listRecommendations(query, userHeader, user) })
        counter++
    }) 
}




function listRecommendations(query, userHeader, user){

    document.body.removeChild(userHeader)

    const recommendationHeader = document.createElement('main')
    document.body.append(recommendationHeader)
    recommendationHeader.innerHTML = `<h3>${query.name}</h3>`
    query.recommendations.forEach(recommendation => {
        const recommendationList = document.createElement('li') 
        recommendationList.innerHTML = 
            `<h4>${recommendation.name}</h4>
            <section>
                <form method="POST" action="http://localhost:3000/search_queries">
                    <input name="name" type="hidden" value="${recommendation.name}">
                    <input type="hidden" name="user_id" value="${user.id}">
                    <input type="submit" value="Add to Library">
                </form>
            </section>
            `
        recommendationHeader.append(recommendationList)

    })
}
// var elem = document.querySelector('#some-element');
// elem.parentNode.removeChild(elem);