function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "/smartphones",
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>Producer</td>\n' +
                '        <td>Model</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            document.getElementById('smartphoneList').innerHTML = content;
        }
    });

    function getSmartphone(smartphone) {
        return `<tr><td >${smartphone.producer}</td><td >${smartphone.model}</td><td >${smartphone.price}</td>` +
            `<td><a class="deleteSmartphone" href="${smartphone.id}">Delete</a></td></tr>`;
    }
}
