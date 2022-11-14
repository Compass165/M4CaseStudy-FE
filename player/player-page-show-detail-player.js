let token = localStorage.getItem("token");
let id = JSON.parse(localStorage.getItem("currentUser")).id;
showPlayer();

function showPlayer() {
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        type: "get", url: "http://localhost:8080/player/find-player-by-id/" + id,
        success: function (data) {
            let name = `<h2>` + data.name + `</h2>`
            $('#player-name').append(name);

            let dob = `<span>` + data.dateOfBirth.slice(0,10) + `</span>`
            $('#dob').append(dob);

            let address = `<span>` + data.address + `</span>`
            $('#address').append(address);

            let username = `<span>` + data.appUser.name + `</span>`
            $('#username').append(username);

            let password = `<span>` + data.appUser.password + `</span>`
            $('#show_hide_password').append(password);

            let height = `<span>` + data.height + " cm" + `</span>`
            $('#height').append(height);

            let weight = `<span>` + data.weight + " kg" + `</span>`
            $('#weight').append(weight);

            let position = `<span>` + data.position.name + `</span>`
            $('#position').append(position);

            let status = `<span>` + data.status.status + `</span>`
            $('#status').append(status);

            let performance = `<span>` + data.performance.ranking + `</span>`
            $('#performance').append(performance);

            let profile = `<span>` + data.profile + `</span>`
            $('#profile').append(profile);

            let salary = `<span>` + data.playerIncome.income + "$" +`</span>`
            $('#salary').append(salary);

            let img = '<img class="user-avatar rounded-circle" src="file://E:/storage/image/' + data.image + ' alt="User Avatar">'
            $('#insertImage').append(img);
        }

    })
    event.preventDefault();
}

$(document).ready(function () {
    $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });
});

function getDetail() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/position",
        //xử lý khi thành công
        success: function (response) {
            arrPosition = response;
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/performance",
        //xử lý khi thành công
        success: function (response) {
            arrPerformance = response;
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/status",
        //xử lý khi thành công
        success: function (response) {
            arrStatus = response;
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/find-player-by-id/" + id,
        //xử lý khi thành công
        success: function (response) {
            objChoose = response;
            appUserChoose = response.appUser;
            let placeholderName = '<input type="text" id="edit-name-val" value="' + response.name + '" class="form-control">'
            $('#edit-name').empty().append(placeholderName);
            let placeholderAddress = '<input type="text" id="edit-address-val" value="' + response.address + '" class="form-control">'
            $('#edit-address').empty().append(placeholderAddress);
            let placeholderAcc = '<p class="form-control-static">' + appUserChoose.name + '</p>'
            $('#edit-account').empty().append(placeholderAcc);
            let placeholderPass = '<input type="text" id="edit-password-val" value="' + appUserChoose.password + '" class="form-control">'
            $('#edit-password').empty().append(placeholderPass);
            let placeholderHeight = '<input type="text" id="edit-height-val" value="' + response.height + '" class="form-control">'
            $('#edit-height').empty().append(placeholderHeight);
            let placeholderWeight = '<input type="text" id="edit-weight-val" value="' + response.weight + '" class="form-control">'
            $('#edit-weight').empty().append(placeholderWeight);
            let placeholderPosition = '<select id="edit-position-val" class="form-control">' +
                '<option value="' + response.position.id + '">' + response.position.name + '</option>'
            for (let i=0; i < arrPosition.length; i++) {
                placeholderPosition += '<option value="' + arrPosition[i].id + '">' + arrPosition[i].name + '</option>'
            }
            placeholderPosition += '</select>'
            $('#edit-position').empty().append(placeholderPosition);
            let placeholderPerformance = '<select id="edit-performance-val" class="form-control">' +
                '<option value="' + response.performance.id + '">' + response.performance.ranking + '</option>'
            for (let i=0; i < arrPerformance.length; i++) {
                placeholderPerformance += '<option value="' + arrPerformance[i].id + '">' + arrPerformance[i].ranking + '</option>'
            }
            placeholderPerformance += '</select>'
            $('#edit-performance').empty().append(placeholderPerformance);
            let placeholderStatus = '<select id="edit-status-val" class="form-control">' +
                '<option value="' + response.status.id + '">' + response.status.status + '</option>'
            for (let i=0; i < arrStatus.length; i++) {
                placeholderStatus += '<option value="' + arrStatus[i].id + '">' + arrStatus[i].status + '</option>'
            }
            placeholderStatus += '</select>'
            $('#edit-status').empty().append(placeholderStatus);
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
}

// Hứng sự kiện edit
$(document).on("click", 'div.modal-content div#edit.modal-footer button.btn.btn-primary', function() {
    editById(idChoose);
});

function editById() {
    //lay du lieu
    let formData = new FormData();
    let name = $('#create-name-val').val();
    let date_of_birth = $('#create-dob-val').val();
    let address = $('#create-address-val').val();
    let password = $('#create-password-val').val();
    let height = $('#create-height-val').val();
    let weight = $('#create-weight-val').val();
    let positionId = $('#create-position-val').children("option:selected").val();
    let positionName = $('#create-position-val').children("option:selected").text();
    let position = {
        id: positionId,
        name: positionName
    }
    let performanceId = $('#create-performance-val').children("option:selected").val();
    let performanceRanking = $('#create-performance-val').children("option:selected").text();
    let performance = {
        id: performanceId,
        ranking: performanceRanking
    }
    let profile = $('#create-file-val')[0].files[0];
    let image = $('#create-image-val')[0].files[0];
    let statusId = $('#create-status-val').children("option:selected").val();
    let statusStatus = $('#create-status-val').children("option:selected").text();
    let status = {
        id: statusId,
        status: statusStatus
    }
    let appUser = {
        id: appUserChoose.id,
        name: appUserChoose.name,
        password: password,
        roleSet: {
            id: 3,
            name: "ROLES_PLAYER",
            authority: "ROLES_PLAYER"
        }
    }
    formData.append('name', name);
    formData.append('dateOfBirth', date_of_birth);
    formData.append('address', address);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('appUser', appUser);
    formData.append('password', password);
    formData.append('position', position);
    formData.append('performance', performance);
    formData.append('playerIncome', objChoose.playerIncome);
    if (image !== undefined){
        formData.append('image', image);
    }
    if (profile !== undefined){
        formData.append('profile', profile);
    }
    formData.append('status', status);

    // goi ajax
    $.ajax({
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        dataType: "json",
        type: "PUT",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data: formData,
        //tên API
        url: "http://localhost:8080/player/edit/" + id,
        //xử lý khi thành công
        success: function (){
            console.log("win")
            showListPlayer(0, 10, '');
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

