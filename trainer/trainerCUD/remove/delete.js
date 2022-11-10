// let object=localStorage.getItem("object");
// let token="";
// console.log(object);
// if(object==null){
//     window.location.href="../login.html"
// }else {
//     console.log("đăng nhập thành công rồi ^_^");
//     let ob=JSON.parse(object);
// token=ob.accessToken;
// console.log(token);
// }
// function remove(){
//     localStorage.removeItem("object");
// }
function getTrainer(trainer){
    return  <td><a class="deleteTrainer" onclick="deleteById($(this))" href="${trainer.id}">delete</a></td>
}
function removeById(id){
    let smartphoneId=id.attr("href");
    $.ajax({
        type:"DELETE",
        url:'http://localhost:8080/trainer/${id}',
        success: function (data){
            a.parent().parent().remove();
        }
    });
    event.preventDefault();
}
