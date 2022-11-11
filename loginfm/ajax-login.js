let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let token = localStorage.getItem("token");
console.log(currentUser)

function checkLogin() {
    if (currentUser === null) {
        $('#dropdownMenuButton1').hide();
        $('#profile').hide();
    }
    else {
        document.getElementById("admin-name").innerHTML = currentUser.username;
        $('#dropdownMenuButton').hide();
    }
}

checkLogin();

function logout() {
    localStorage.clear();
    window.location.href = "home.html";
}

function login() {
    let username = $('#name').val();
    let password = $('#password').val();
    if (username === "") {
        document.getElementById("error_login").innerHTML = "username address cannot be blank !";
        return false;
    }
    if (password === "") {
        document.getElementById("error_login").innerHTML = "Password can not be blank !";
        return false;
    }
    let data = {
        name: username,
        password: password
    };
    $.ajax({
        url: `http://localhost:8080/login`,
        type: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data),
        success: function (data) {
            if (data === undefined) {
                document.getElementById("error_login").innerHTML = "Username or password is incorrect !"
                return false;
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("currentUser", JSON.stringify(data));
                window.location.href = "home.html"
            }
        }
    });
    event.preventDefault();
}
