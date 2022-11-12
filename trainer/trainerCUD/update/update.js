let id = JSON.parse(localStorage.getItem("currentUser")).id;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let token = localStorage.getItem("token");
// bên list hiển thi thì lấy cái function này để hiển thị lên
function showEditForm(iid){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/traine" +iid,
        success: function (list){
           console.log(list);
        }
    })
}
