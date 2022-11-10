function getTrainer(trainer){
    return  <td><a class="updateTrainer" onclick="updeteById($(this))" href="${trainer.id}">delete</a></td>
}
function updateTrainer(id){
   let trainerId=id.attr("href");
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
        type: "PUT",
        // data: JSON.stringify(newTrainer),
        //tên API
        url: 'http://localhost:8080/trainer/${id}'+trainerId,
        success:function (data){
            id.parent().parent().put();
        }
        //xử lý khi thành công
        success:successHandle();

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();