function showListTrainer() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/trainer",
        //xử lý khi thành công
        success: function (response) {
            $('#abc').empty();
            // hien thi danh sach o day
            let content = '<div class="animated fadeIn"><div class="row"><div class="col-md-12"><div class="card"><div class="card-header">\n' +
                '                                <strong class="card-title">Danh sách huấn luyện viên</strong>\n' +
                '                            </div>\n' +
                '                            <div class="card-body">\n' +
                '                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">\n' +
                '                                    <thead>\n' +
                '                                        <tr>' +
                '        <td>Name</td>\n' +
                '        <td>Birthday</td>\n' +
                '        <td>Address</td>\n' +
                '        <td>View</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr></thead><tbody>';
            for (let i = 0; i < response.length; i++) {
                content += getTrainer(response[i]);
            }
            content += '</tbody>\n' +
                '                                </table>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '\n' +
                '                </div>\n' +
                '            </div>';
            // content += '</table><div>\n' +
            //     '  <button onclick=showListTrainer('+previous+')>Previous</button>' +
            //     + (response.pageable.pageNumber + 1) + '/' + response.totalPages +
            //     '  <button onclick=showListTrainer('+next+')>Next</button>' +
            //     '</div></div>';
            // document.getElementById('abc').innerHTML = content;
            $('#abc').append(content);
        }
    });
    // chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getTrainer(trainer) {
    return `<tr><td >${trainer.name}</td>
                <td >${trainer.dateOfBirth}</td>
                <td >${trainer.address}</td>` +
        `<td><a class="action" href="../trainerRS/view.html">View</a></td>` +
        `<td><a class="action" href="../trainerCUD/update/update.html">Edit</a></td>` +
        `<td><a class="action" href="${trainer.id}" onclick="deleteById(this)">Delete</a></td>
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
