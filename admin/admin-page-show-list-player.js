let token = localStorage.getItem("token");
let idChoose;
let objChoose;
let appUserChoose;
let arrPosition;
let arrPerformance;
let arrStatus;
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



function addNewTrainer() {
    //lay du lieu
    let address = $('#address').val();
    let cv_file = $('#cv_file').val();
    let date_of_birth = $('#date_of_birth').val();
    let name = $('#name').val();
    let app_user_id = $('#app_user_id').val();
    let income_id = $('#income_id').val();
    let newTrainer = {
        address: address,
        cv_file: cv_file,
        date_of_birth: date_of_birth,
        name: name,
        app_user_id: app_user_id,
        income_id:income_id
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newTrainer),
        //tên API
        url: "http://localhost:8080/trainer",
        //xử lý khi thành công
        success: function (){
            showListPlayer();
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
        url: "http://localhost:8080/player/" + id,
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
$(document).on("click", 'div.modal-content div.modal-footer button.btn.btn-primary', function() {
    editById(idChoose);
});

function editById(id) {
    //lay du lieu
    let name = $('#edit-name-val').val();
    let date_of_birth = $('#edit-dob-val').val();
    let address = $('#edit-address-val').val();
    let password = $('#edit-password-val').val();
    let height = $('#edit-height-val').val();
    let weight = $('#edit-weight-val').val();
    let positionId = $('#edit-position-val').children("option:selected").val();
    let positionName = $('#edit-position-val').children("option:selected").text();
    let performanceId = $('#edit-performance-val').children("option:selected").val();
    let performanceRanking = $('#edit-performance-val').children("option:selected").text();
    let profile = $('#edit-file-val').val();
    let image= $('#edit-image-val').val();
    let statusId = $('#edit-status-val').children("option:selected").val();
    let statusStatus = $('#edit-status-val').children("option:selected").text();
    let appUser = {
        id: appUserChoose.id,
        name: appUserChoose.name,
        password: password,
        roleSet: appUserChoose.roleSet
    }
    let object = {
        name: name,
        dateOfBirth: date_of_birth,
        address: address,
        height: height,
        weight: weight,
        appUser: appUser,
        position: {
            id: positionId,
            name: positionName
        },
        performance: {
            id: performanceId,
            name: performanceRanking
        },
        playerIncome: objChoose.playerIncome,
        profile: profile,
        image: image,
        status: {
            id: statusId,
            name: statusStatus
        }
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data: JSON.stringify(object),
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
