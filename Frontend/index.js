fetch(`http://localhost:3000/users`)
    .then(response => response.json())
    .then(itemSearch => index(itemSearch))
const list = document.getElementById("list")

function index(itemSearch) {
    console.log(itemSearch)
    itemSearch.forEach( item => {
        const name = document.createElement("h3")
        name.innerHTML = item.name
        list.append(name)
    })
}