function logout() {
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "../loginfm/page-login.html";
}
