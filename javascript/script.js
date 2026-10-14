document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "asdfghj" && password === "12345678") {
        alert("Login successful!");
    } else {
        alert("Invalid username or password!");
    }

});