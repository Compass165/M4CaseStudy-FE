let id = JSON.parse(localStorage.getItem("currentUser")).id;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let token = localStorage.getItem("token");

getTrainerById();
function getTrainerById() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/trainer/" + id,
        //xử lý khi thành công
        success: function (response) {
            $('#getName').append(response.name);
            let img = '<img class="user-avatar rounded-circle" src="../images/'+'admin'+'.jpg" alt="User Avatar">'
            $('#insertImage').append(img);
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
};


