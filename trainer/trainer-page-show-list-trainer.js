showListTrainer();

function showListTrainer() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/trainer/page",
        data: {
            page: 0,
            size: 10
        },
        //xử lý khi thành công
        success: function (response) {
            $('#bootstrap-data-table-export tbody').empty();
            // add table rows
            $.each(response.content, (id, trainer) => {
                let noteRow = '<tr>' +
                    '<td>' + trainer.name + '</td>' +
                    '<td>' + trainer.dateOfBirth + '</td>' +
                    '<td>' + trainer.dateOfBirth + '</td>' +
                    '<td>' + trainer.address + '</td>' +
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

function getTrainer(trainer) {
    return `<tr><td >${trainer.name}</td>
                <td >${trainer.dateOfBirth}</td>
                <td >${trainer.dateOfBirth}</td>
                <td >${trainer.address}</td>
                </tr>`;
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
