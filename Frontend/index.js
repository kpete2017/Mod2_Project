fetch(`http://localhost:3000/users`)
    .then(response => response.json())
    .then(itemSearch => login(itemSearch))
const list = document.getElementById("list")


function login(itemSearch) {
    const main = document.getElementById("list")
    main.innerHTML = `
    <form>
        <input type="text" name="username" placeholder="Username"/></br>
        <input type="password" name="password" placeholder="Password"/></br>
        <input type="submit" value="Login"/>
    </form>`    
    document.body.append(main)
}

function index(users) {
    // console.log(itemSearch)
    users.forEach( user => {
        const name = document.createElement("h3")
        name.innerHTML = user.name
        name.addEventListener("click", function(event){handleEvent: listUserQueries(user)})
        list.append(name)
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
    searchQueries(user.search_queries, userHeader)
}

function searchQueries(sq, userHeader) {
    const querySec = document.createElement('section')
    querySec.id = "list-id"
    userHeader.append(querySec)
    sq.forEach( query => {
        const queryList = document.createElement('li')
        queryList.textContent = query.name
        queryList.addEventListener("click", function(event) {handleEvent: listRecommendations(query, userHeader) })
        querySec.append(queryList)
    })
}

function listRecommendations(query, userHeader){
    document.body.removeChild(userHeader)

    const recommendationHeader = document.createElement('main')
    document.body.append(recommendationHeader)
    recommendationHeader.innerHTML = `<h3>${query.name}</h3>`
    query.recommendations.forEach(recommendation => {
        const recommendationList = document.createElement('li') 
        recommendationList.textContent = recommendation.name
        recommendationHeader.append(recommendationList)
    })
}
// var elem = document.querySelector('#some-element');
// elem.parentNode.removeChild(elem);