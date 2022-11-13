let token = localStorage.getItem("token");
let idChoose;
let objChoose;
showSalaryPlayer(0, 10, '');
let totalPages = 1;
function showSalaryPlayer(startPage, size, nameSearch) {
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
                    '<td>$' + player.playerIncome.salary + '</td>' +
                    '<td>$' + player.playerIncome.playTime + '</td>' +
                    '<td>' + player.playerIncome.bonus + 'h</td>' +
                    '<td>$' + ((player.playerIncome.bonus * player.playerIncome.playTime) + player.playerIncome.salary) + '</td>' +
                    '<td><button type="button" onclick="getDetail(' + player.id + ')" class="btn btn-success" data-toggle="modal" data-target="#modalEdit"><i class="fa fa-magic"></i>&nbsp; Edit</button></td>' +
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



function addNewSalary() {
    //lay du lieu
    let salary = $('#salary').val();
    let playTime = $('#playTime').val();
    let bonus = $('#bonus').val();
    // let name = $('#name').val();
    // let app_user_id = $('#app_user_id').val();
    // let income_id = $('#income_id').val();
    let newSalary = {
        salary: salary,
        playTime: playTime,
        bonus: bonus
        // name: name,
        // app_user_id: app_user_id,
        // income_id:income_id
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSalary),
        //tên API
        url: "http://localhost:8080/player/list-player",
        //xử lý khi thành công
        success: function (){
            showLister();
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
        url: "http://localhost:8080/player/find-player-by-id/" + id,
        //xử lý khi thành công
        success: function (response) {
            objChoose = response;
            // appUserChoose = response.appUser;
            let placeholderSalary = '<input type="number" id="edit-salary-val" value="' + response.playerIncome.salary + '" class="form-control">'
            $('#edit-salary').empty().append(placeholderSalary);
            let placeholderplayTime = '<input type="number" id="edit-playTime-val" value="' + response.playerIncome.playTime + '" class="form-control">'
            $('#edit-playTime').empty().append(placeholderplayTime);
            let placeholderBonus = '<input type="number" id="edit-bonus-val" value="' + response.playerIncome.bonus + '" class="form-control">'
            $('#edit-bonus').empty().append(placeholderBonus);
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
    let salary = $('#edit-salary-val').val();
    let playTime = $('#edit-playTime-val').val();
    let bonus = $('#edit-bonus-val').val();
    // let password = $('#edit-password-val').val();
    // let height = $('#edit-height-val').val();
    // let weight = $('#edit-weight-val').val();
    // let position = $('#edit-position-val').val();
    // let performance = $('#edit-performance-val').val();
    // let cv_file = $('#edit-file-val').val();
    let salaryPlayer = {
        salary: salary,
        playTime: playTime,
        bonus: bonus
    }
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
        data: JSON.stringify(salaryPlayer),
        //tên API
        url: "http://localhost:8080/player/editIncome/" + id,
        //xử lý khi thành công
        success: function (){
            console.log("win")
            showSalaryPlayer(0, 10, '');
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
