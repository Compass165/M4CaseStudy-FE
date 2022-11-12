let id = JSON.parse(localStorage.getItem("currentUser")).id;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let token = localStorage.getItem("token");
// bên list hiển thi thì lấy cái function này để hiển thị lên
// ${ten array [i].id}
let editForm =document.getElementById("editTrainer");
function showEditForm(id){
    let editFormData =new FormData()
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/traine"+id,
        success: function (response){
          //  tést chỗ này xem có nhận được id không nhé nó sẽ hiện theo console
            //viết bên dưới vào debug là thấy nếu nhận được.
           console.log(response);

        }
    })
}
function updateTrainer(){

}
