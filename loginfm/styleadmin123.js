let ob = localStorage.getItem("ob");
let token ="";
console.log(ob);
if (ob == null) {
    window.location.href = "../page-login.html"
}
else {
console.log("dang nhap roi");
let object = JSON.parse(ob);

token = object.accessToken;
console.log(token);

}

function logout() {
    localStorage.removeItem("ob");
}
