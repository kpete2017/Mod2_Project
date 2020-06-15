fetch(`http://localhost:3000/users`)
    .then(response => response.json())
    .then(itemSearch => index(itemSearch))
const list = document.getElementById("list")

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
    userHeader = document.createElement('main')
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
    searchQueries(user.search_queries)
}

function searchQueries(sq) {
    sq.forEach( query => {
        queryList = document.createElement('p')
        queryList.textContent = query.name
        queryList.addEventListener("click", function(event) {handleEvent: listRecommendations(query) })
        userHeader.append(queryList)
    })
}

function listRecommendations(query){
    console.log(query.recommendations)
}
// var elem = document.querySelector('#some-element');
// elem.parentNode.removeChild(elem);