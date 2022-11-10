function showListTrainer(page) {
    let next = page + 1;
    let previous = page - 1;
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/trainer/page?page=" + page,
        //xử lý khi thành công
        success: function (response) {
            $('#abc').empty();
            // hien thi danh sach o day
            let content = '    <div><table><tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Birthday</td>\n' +
                '        <td>Address</td>\n' +
                '        <td>View</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < response.content.length; i++) {
                content += getTrainer(response.content[i]);
            }
            content += '</table><div>\n' +
                '  <button onclick=showListTrainer('+previous+')>Previous</button>' +
                + (response.pageable.pageNumber + 1) + '/' + response.totalPages +
                '  <button onclick=showListTrainer('+next+')>Next</button>' +
                '</div></div>';
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
