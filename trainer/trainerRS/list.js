successHandler()

// function addNewSmartPhone() {
//     //lay du lieu
//     let producer = $('#producer').val();
//     let model = $('#model').val();
//     let price = $('#price').val();
//     let newSmartphone = {
//         producer: producer,
//         model: model,
//         price: price
//     };
//     // goi ajax
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "POST",
//         data: JSON.stringify(newSmartphone),
//         //tên API
//         url: "/smartphones",
//         //xử lý khi thành công
//         success: successHandler
//
//     });
//     //chặn sự kiện mặc định của thẻ
//     event.preventDefault();
// }

function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/trainer/page",
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Birthday</td>\n' +
                '        <td>Address</td>\n' +
                '        <td>View</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.content.length; i++) {
                content += getTrainer(data.content[i]);
            }
            content += '<div>\n' +
                '  <a href="${trainer.id}/(page=${trainers.number - 1}, size=${trainers.size}, s=${keyword})}">\n' +
                '    Previous\n' +
                '  </a>\n' +
                '  [[${data.number + 1}]]/[[${data.totalPages}]]\n' +
                '  <a href="${trainer.id}/(page=${trainers.number + 1}, size=${trainers.size}, s=${keyword})}">\n' +
                '    Next\n' +
                '  </a>\n' +
                '</div>'
            document.getElementById('trainerList').innerHTML = content;
        }
    });
    // chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getTrainer(trainer) {
    return `<tr><td >${trainer.name}</td>
                <td >${trainer.dateOfBirth}</td>
                <td >${trainer.address}</td>` +
        `<td><a class="deleteTrainer" href="${trainer.id}">View</a></td>` +
        `<td><a class="deleteTrainer" href="${trainer.id}">Edit</a></td>` +
        `<td><a class="deleteTrainer" href="${trainer.id}">Delete</a></td>
                </tr>`;
}

// $(document).ready(function () {
//     //sư kiện nào thực hiện Ajax
//     $('.deleteSmartphone').click(function (event) {
//         //lay du lieu
//         let a = $(this);
//         let smartphoneId = a.attr("href");
//         // goi ajax
//         $.ajax({
//             type: "DELETE",
//             //tên API
//             url: `/smartphones/${smartphoneId}`,
//             //xử lý khi thành công
//             success: function (data) {
//                 a.parent().parent().remove();
//             }
//
//         });
//         //chặn sự kiện mặc định của thẻ
//         event.preventDefault();
//     });
// })