// let token = localStorage.getItem("token");
showListTrainer(0, 10, '');
let totalPages = 1;
function showListTrainer(startPage, size, nameSearch) {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/trainer/page",
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
            $.each(response.content, (id, trainer) => {
                let noteRow = '<tr>' +
                    '<td>' + trainer.name + '</td>' +
                    '<td>' + trainer.dateOfBirth.slice(0,10) + '</td>' +
                    '<td>' + trainer.address + '</td>' +
                    '</tr>';
                $('#bootstrap-data-table-export tbody').append(noteRow);
            });
            let abc = 'Hiển thị từ ' + ((response.size*response.pageable.pageNumber)+1) + ' tới ' + ((response.size*response.pageable.pageNumber)+response.size) + ' trong ' + response.totalElements + ' huấn luyện viên';
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
    showListTrainer(0, 10, nameSearch);
});

// Hứng sự kiện size page
$(document).on("mouseout", 'div.dataTables_length label select.custom-select.custom-select-sm.form-control.form-control-sm', function() {
    let size = $(this).val();
    showListTrainer(0, size, '');
});

$(document).on("click", "ul.pagination li a", function() {
    var data = $(this).attr('data');
    let val = $(this).text();
    console.log('val: ' + val);

    // click on the NEXT tag
    if(val.toUpperCase() === "« FIRST") {
        let currentActive = $("li.active");
        showListTrainer(0, 10, '');
        $("li.active").removeClass("active");
        // add .active to next-pagination li
        currentActive.next().addClass("active");
    } else if(val.toUpperCase() === "LAST »") {
        showListTrainer(totalPages - 1, 10, '');
        $("li.active").removeClass("active");
        // add .active to next-pagination li
        currentActive.next().addClass("active");
    } else if(val.toUpperCase() === "NEXT ›") {
        let activeValue = parseInt($("ul.pagination li.active").text());
        if(activeValue < totalPages){
            let currentActive = $("li.active");
            startPage = activeValue;
            showListTrainer(startPage, 10, '');
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
            showListTrainer(startPage, 10, '');
            let currentActive = $("li.active");
            currentActive.removeClass("active");
            // add .active to previous-pagination li
            currentActive.prev().addClass("active");
        }
    } else {
        startPage = parseInt(val - 1);
        showListTrainer(startPage, 10, '');
        // add focus to the li tag
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
        //$(this).addClass("active");
    }
});
