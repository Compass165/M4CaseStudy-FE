// let currentUser = JSON.parse(localStorage.getItem("currentUser"));
// let token = localStorage.getItem("token");
// console.log(currentUser)
//
//
// function checkLogin() {
//     if (currentUser == null) {
//
//     }
// }

function login() {
    event.preventDefault();
    //lay du lieu
    //lay username, password
    let name = $("#name").val();
    let password = $("#password").val();
    //tao object
    let user ={
        "name":name,
        "password":password
    }

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem("ob", JSON.stringify(data));
            window.location.href = "../loginfm/admin.html";
        }
    });




}
