let token = localStorage.getItem("token");
let id = JSON.parse(localStorage.getItem("currentUser")).id;
showPlayer();
function showPlayer() {
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        type: "get", url: "http://localhost:8080/player/find-player-by-id/"+ id,
        success: function (data) {
            let name = `<h2>` + data.name + `</h2>`
            $('#player-name').append(name);

            let dob = `<span>` + data.dateOfBirth + `</span>`
            $('#dob').append(dob);

            let address = `<span>` + data.address + `</span>`
            $('#address').append(address);

            let username = `<span>` + data.appUser.name + `</span>`
            $('#username').append(username);

            let password = `<span>` + data.appUser.password + `</span>`
            $('#show_hide_password').append(password);

            let height = `<span>` + data.height +" cm"+ `</span>`
            $('#height').append(height);

            let weight = `<span>` + data.weight + " kg"+`</span>`
            $('#weight').append(weight);

            let position = `<span>` + data.position.name + `</span>`
            $('#position').append(position);

            let status = `<span>` + data.status.status + `</span>`
            $('#status').append(status);

            let performance = `<span>` + data.performance.ranking + `</span>`
            $('#performance').append(performance);

            let profile = `<span>` + data.profile + `</span>`
            $('#profile').append(profile);
        }

    })
    event.preventDefault();
}

$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });
});
