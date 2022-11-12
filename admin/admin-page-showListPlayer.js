let token = localStorage.getItem("token");
showListPlayer();

function showListPlayer() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //tên API
        url: "http://localhost:8080/player/page-player",
        data: {
            page: 0,
            size: 10
        },
        //xử lý khi thành công
        success: function (response) {
            $('#bootstrap-data-table-export tbody').empty();
            // add table rows
            $.each(response.content, (id, player) => {
                let noteRow = '<tr>' +
                    '<td>' + player.name + '</td>' +
                    '<td>' + player.dateOfBirth + '</td>' +
                    '<td>' + player.address + '</td>' +
                    '<td>' + player.position.name + '</td>' +
                    '<td>' + player.performance.ranking + '</td>' +
                    '</tr>';
                $('#bootstrap-data-table-export tbody').append(noteRow);
            });

            // if ($('ul.pagination li').length - 2 != response.totalPages) {
            //     // build pagination list at the first time loading
            //     $('ul.pagination').empty();
            //     buildPagination(response);
            // }
        },
        error : function(e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
    // chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
