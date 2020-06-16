login()

function login() {
    const main = document.getElementById("list")
    main.innerHTML = `
    <form method="GET" action="http://localhost:3000/users">
        <input type="text" name="username" placeholder="Username" value="kylep20"/></br>
        <input type="text" name="password" placeholder="Password" value="Iheartrhcp30"/></br>
        <input id="submit-button" type="submit" value="Login"/>
    </form>`    
    const name = document.getElementById("submit-button")
    document.body.append(main)
    name.addEventListener("click", function(event){ handleEvent: alert('Click listerner worked'), fetchUser()})
    document.body.append(main)
}

function fetchUser() {
    alert("Made it to Fetch User")
    fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(userInfo => index(userInfo))
}


const list = document.getElementById("list")


function index(users) {
    // console.log(itemSearch)
    alert(users[0]["name"])
    alert("Made it to index")
    users.forEach( user => {
        const name = document.createElement("h3")
        name.innerHTML = user.name
        name.addEventListener("click", function(event){handleEvent: listUserQueries(user)})
        list.append(name)
    })
}

main = document.querySelector("main")

function listUserQueries(user) {
    alert("Made it to list queries")
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