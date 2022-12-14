// let token = localStorage.getItem("token");
let idChoose;
let objChoose;
let appUserChoose;
let arrPosition;
let arrPerformance;
let arrStatus;
let totalE;
showListPlayer(0, 10, '');
let totalPages = 1;
function showListPlayer(startPage, size, nameSearch) {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/search-page-player/name",
        data: {
            page: startPage,
            size: size,
            name: nameSearch
        },
        //xử lý khi thành công
        success: function (response) {
            totalE = response.totalElements;
            console.log(response);
            $('#bootstrap-data-table-export tbody').empty();
            // add table rows
            $.each(response.content, (id, player) => {
                let noteRow = '<tr>' +
                    '<td>' + player.name + '</td>' +
                    '<td>' + player.dateOfBirth.slice(0,10) + '</td>' +
                    '<td>' + player.address + '</td>' +
                    '<td>' + player.position.name + '</td>' +
                    '<td>' + player.performance.ranking + '</td>' +
                    '<td><button type="button" onclick="getDetail(' + player.id + ')" class="btn btn-success" data-toggle="modal" data-target="#modalEdit"><i class="fa fa-magic"></i>&nbsp; Edit</button></td>' +
                    '<td><button type="button" onclick="deleteById(' + player.id + ')" class="btn btn-danger"><i class="fa fa-rss"></i>&nbsp; Delete</button></td>' +
                    '</tr>';
                $('#bootstrap-data-table-export tbody').append(noteRow);
            });
            let abc = 'Hiển thị từ ' + ((response.size*response.pageable.pageNumber)+1) + ' tới ' + ((response.size*response.pageable.pageNumber)+response.size) + ' trong ' + response.totalElements + ' cầu thủ';
            $('#bootstrap-data-table-export_info').empty().append(abc);

            // if ($('ul.pagination li').length - 2 != response.totalPages) {
            //     // build pagination list at the first time loading
            // $('ul.pagination').empty();
            // buildPagination(response);
            // }
            $('ul.pagination').empty();
            buildPagination(response);
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
}

// function này tạo các trang
function buildPagination(response) {
    totalPages = response.totalPages;

    var pageNumber = response.pageable.pageNumber;

    var numLinks = 10;

    // print 'previous' link only if not on page one
    var first = '';
    var prev = '';
    if (pageNumber > 0) {
        if(pageNumber !== 0) {
            first = '<li class="page-item"><a class="page-link">« First</a></li>';
        }
        prev = '<li class="page-item"><a class="page-link">‹ Prev</a></li>';
    } else {
        prev = ''; // on the page one, don't show 'previous' link
        first = ''; // nor 'first page' link
    }

    // print 'next' link only if not on the last page
    var next = '';
    var last = '';
    if (pageNumber < totalPages) {
        if(pageNumber !== totalPages - 1) {
            next = '<li class="page-item"><a class="page-link">Next ›</a></li>';
            last = '<li class="page-item"><a class="page-link">Last »</a></li>';
        }
    } else {
        next = ''; // on the last page, don't show 'next' link
        last = ''; // nor 'last page' link
    }

    var start = pageNumber - (pageNumber % numLinks) + 1;
    var end = start + numLinks - 1;
    end = Math.min(totalPages, end);
    var pagingLink = '';

    for (var i = start; i <= end; i++) {
        if (i == pageNumber + 1) {
            pagingLink += '<li class="page-item active"><a class="page-link"> ' + i + ' </a></li>'; // no need to create a link to current page
        } else {
            pagingLink += '<li class="page-item"><a class="page-link"> ' + i + ' </a></li>';
        }
    }

    // return the page navigation link
    pagingLink = first + prev + pagingLink + next + last;

    $("ul.pagination").append(pagingLink);
}

// Hứng sự kiện search
$(document).on("change", 'div.dataTables_filter label input.form-control.form-control-sm', function() {
    let nameSearch = $(this).val();
    showListPlayer(0, 10, nameSearch);
});

// Hứng sự kiện size page
$(document).on("mouseout", 'div.dataTables_length label select.custom-select.custom-select-sm.form-control.form-control-sm', function() {
    let size = $(this).val();
    showListPlayer(0, size, '');
});

$(document).on("click", "ul.pagination li a", function() {
    var data = $(this).attr('data');
    let val = $(this).text();
    console.log('val: ' + val);

    // click on the NEXT tag
    if(val.toUpperCase() === "« FIRST") {
        let currentActive = $("li.active");
        showListPlayer(0, 10, '');
        $("li.active").removeClass("active");
        // add .active to next-pagination li
        currentActive.next().addClass("active");
    } else if(val.toUpperCase() === "LAST »") {
        showListPlayer(totalPages - 1, 10, '');
        $("li.active").removeClass("active");
        // add .active to next-pagination li
        currentActive.next().addClass("active");
    } else if(val.toUpperCase() === "NEXT ›") {
        let activeValue = parseInt($("ul.pagination li.active").text());
        if(activeValue < totalPages){
            let currentActive = $("li.active");
            startPage = activeValue;
            showListPlayer(startPage, 10, '');
            // remove .active class for the old li tag
            $("li.active").removeClass("active");
            // add .active to next-pagination li
            currentActive.next().addClass("active");
        }
    } else if(val.toUpperCase() === "‹ PREV") {
        let activeValue = parseInt($("ul.pagination li.active").text());
        if(activeValue > 1) {
            // get the previous page
            startPage = activeValue - 2;
            showListPlayer(startPage, 10, '');
            let currentActive = $("li.active");
            currentActive.removeClass("active");
            // add .active to previous-pagination li
            currentActive.prev().addClass("active");
        }
    } else {
        startPage = parseInt(val - 1);
        showListPlayer(startPage, 10, '');
        // add focus to the li tag
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
        //$(this).addClass("active");
    }
});

function getDetailC(id) {
    idChoose = id;
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
            let placeholderName = '<input type="text" id="create-name-val" value="' + response.name + '" class="form-control">'
            $('#create-name').empty().append(placeholderName);
            let placeholderAddress = '<input type="text" id="create-address-val" value="' + response.address + '" class="form-control">'
            $('#create-address').empty().append(placeholderAddress);
            let placeholderAcc = '<input type="text" id="create-account-val" value="' + appUserChoose.name + '" class="form-control">'
            $('#create-account').empty().append(placeholderAcc);
            let placeholderPass = '<input type="text" id="create-password-val" value="' + appUserChoose.password + '" class="form-control">'
            $('#create-password').empty().append(placeholderPass);
            let placeholderHeight = '<input type="text" id="create-height-val" value="' + response.height + '" class="form-control">'
            $('#create-height').empty().append(placeholderHeight);
            let placeholderWeight = '<input type="text" id="create-weight-val" value="' + response.weight + '" class="form-control">'
            $('#create-weight').empty().append(placeholderWeight);
            let placeholderPosition = '<select id="create-position-val" class="form-control">' +
                '<option value="' + response.position.id + '">' + response.position.name + '</option>'
            for (let i=0; i < arrPosition.length; i++) {
                placeholderPosition += '<option value="' + arrPosition[i].id + '">' + arrPosition[i].name + '</option>'
            }
            placeholderPosition += '</select>'
            $('#create-position').empty().append(placeholderPosition);
            let placeholderPerformance = '<select id="create-performance-val" class="form-control">' +
                '<option value="' + response.performance.id + '">' + response.performance.ranking + '</option>'
            for (let i=0; i < arrPerformance.length; i++) {
                placeholderPerformance += '<option value="' + arrPerformance[i].id + '">' + arrPerformance[i].ranking + '</option>'
            }
            placeholderPerformance += '</select>'
            $('#create-performance').empty().append(placeholderPerformance);
            let placeholderStatus = '<select id="create-status-val" class="form-control">' +
                '<option value="' + response.status.id + '">' + response.status.status + '</option>'
            for (let i=0; i < arrStatus.length; i++) {
                placeholderStatus += '<option value="' + arrStatus[i].id + '">' + arrStatus[i].status + '</option>'
            }
            placeholderStatus += '</select>'
            $('#create-status').empty().append(placeholderStatus);
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
}

// Hứng sự kiện create
$(document).on("click", 'div.card-header label.switch.switch-text.switch-success', function() {
    getDetailC(totalE);
});

function addNewPlayer() {
    //lay du lieu
    let formData = new FormData();
    let name = $('#create-name-val').val();
    let date_of_birth = $('#create-dob-val').val();
    let address = $('#create-address-val').val();
    let account = $('#create-account-val').val();
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
        id: totalE,
        name: account,
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
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data: formData,
        //tên API
        url: "http://localhost:8080/player/create",
        //xử lý khi thành công
        success: function (){
            showListPlayer(0, 10, '');
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function deleteById(id){
    // goi ajax
    $.ajax({
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/delete/" + id,
        //xử lý khi thành công
        success: function (data) {
            console.log("Xoa thanh cong ");
            showListPlayer(0, 10, '');
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getDetail(id) {
    idChoose = id;
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

function editById(id) {
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
