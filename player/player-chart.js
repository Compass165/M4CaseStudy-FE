// let token = localStorage.getItem("token");
// let id = JSON.parse(localStorage.getItem("currentUser")).id;

getSalaryPlayer()

    function getSalaryPlayer() {

        $.ajax({
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + token);
            },
            //ten API
            url: "http://localhost:8080/player/find-player-by-id/" + id,
            //xu ly thanh cong
            success: function (response) {
                console.log(response)
                console.log("hello")
                let noteRow = '<tr>' +
                     '<td>' + response.name + '</td>' +
                    '<td>$' + response.playerIncome.bonus + '</td>' +
                    '<td>' + response.playerIncome.playTime + '</td>' +
                    '<td>$' + response.playerIncome.salary + '</td>' +
                    '<td>$' + (response.playerIncome.salary + (response.playerIncome.bonus * response.playerIncome.playTime)) + '</td>' +
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
