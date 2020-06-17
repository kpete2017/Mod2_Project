const newButton = document.getElementById("account-button")
newButton.addEventListener("click", function(event) {handleEvent: newAccount() })


function newAccount() {
    const list = document.getElementById("list")
    list.innerHTML = `
    <h1>New Account!</h1>        
    <form method="POST" action="http://localhost:3000/users">
        <label>Username:</label>
        <input type="text" name="username" placeholder="Username" value="kylep20"/></br>
        <label>Password:</label>
        <input type="password" name="password" placeholder="Password" value="Iheartrhcp30"/></br>
        <label>Name:</label>
        <input id="name" type="text" name="name" placeholder="name"/></br>
        <div id="submit">
            <input id="submit-button" type="submit" value="Create New Account"/>
        </div>
    </form>`
    document.body.append(list)
}