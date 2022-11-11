let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let token = localStorage.getItem("token");
console.log(currentUser)

// if (token == null) {
//     window.location.href = "page-login.html";
// }

function checkLogin() {
    if (currentUser === null) {
        $('#dropdownMenuButton1').hide();
        $('#profile').hide();
        console.log("loi")
    }
    else {
        document.getElementById("name").innerHTML = currentUser.username;
        $('#dropdownMenuButton').hide();
    }
    login()
}

checkLogin();

function logout() {
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "page-login.html";
}
// $('#logout').click(function () {
//     localStorage.clear();
//     location.href="/page-login.html";
// })

function login() {
    let username = $('#name').val();
    let password = $('#password').val();
    if (username === "") {
        document.getElementById("error_login").innerHTML = "Tên tài khoản không được để trống !";
        return false;
    }
    if (password === "") {
        document.getElementById("error_login").innerHTML = "Mật khẩu không được để trống !";
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
                document.getElementById("error_login").innerHTML = "Tài khoản hoặc mật khẩu không đúng !"
                return false;
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("currentUser", JSON.stringify(data));
                // window.location.href = "home.html"
                if (data.roles[0].authority == "ROLES_ADMIN") {
                    location.href = "../admin/admin-page.html";
                } else if (data.roles[0].authority == "ROLES_TRAINER") {
                    location.href = "../trainer/trainer-page.html";
                } else if (data.roles[0].authority == "ROLES_PLAYER") {
                    location.href = "../player/player-page.html";
                } console.log(currentUser);
            }
            }
    })
    event.preventDefault();
}
