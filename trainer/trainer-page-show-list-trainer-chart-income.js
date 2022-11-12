// let tkn = localStorage.getItem("token");
// let id = JSON.parse(localStorage.getItem("currentUser")).id;

getSalaryTrainer()

function getSalaryTrainer() {

    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        //ten API
        url: "http://localhost:8080/trainer/" + id,
        //xu ly thanh cong
        success: function (response) {
            console.log(response)
            console.log("hello")
            let noteRow = '<tr>' +
                '<td>' + response.name + '</td>' +
                '<td>$' + response.income.bonus + '</td>' +
                '<td>$' + response.income.salary + '</td>' +
                '<td>$' + (response.income.salary + response.income.bonus) + '</td>' +
                '</tr>';
            $('#bootstrap-data-table-export tbody').append(noteRow);
            $('ul.pagination').empty();
            // buildPagination(response);
        },
        error: function (e) {
            alert("ERROR: ", e);
            console.log("ERROR: ", e);
        }
    });
}
