function addNewTrainer(){
    $.ajax({
        type:"PUT",
        url:"http://localhost:8080/trainer/${id}",
        success: function (data){
            let content ="<tr>\n" +
                ""
        }
    })
}