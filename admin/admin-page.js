function showListPlayer() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/player/list-player",
        success: function (response) {
            $('#abc').empty();
            let content = '<div class="animated fadeIn"><div class="row"><div class="col-md-12"><div class="card"><div class="card-header">\n' +
                '                                <strong class="card-title">Danh sách cầu thủ</strong>\n' +
                '                            </div>\n' +
                '                            <div class="card-body">\n' +
                '                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">\n' +
                '                                    <thead>\n' +
                '                                        <tr>' +
                '        <td>Name</td>\n' +
                '        <td>Birthday</td>\n' +
                '        <td>Address</td>\n' +
                '        <td>position</td>\n' +
                '        <td>performance</td>\n' +
                // '        <td>view</td>\n' +
                // '        <td>Edit</td>\n' +
                // '        <td>Delete</td>\n' +
                '    </tr></thead><tbody>';
            for (let i = 0; i < response.length; i++) {
                content += getPlayer(response[i]);
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
            $('#abc').append(content);
        }
    });
    // chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getPlayer(player) {
    return `<tr><td >${player.name}</td>
                <td >${player.dateOfBirth}</td>
                <td >${player.address}</td>
                <td >${player.position}</td>
<!--                <td >${player.performance}</td>` +
        // `<td><a class="action" href="../trainerRS/view.html">View</a></td>` +
        `<td><a class="action" href="../trainerCUD/update/update.html">Edit</a></td>` +
        `<td><a class="action" href="${trainer.id}" onclick="deleteById(this)">Delete</a></td>-->
                </tr>`;
}
