showListPlayer();

function showListPlayer() {
    $.ajax({
        type: "GET",
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
            showListTrainer();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
