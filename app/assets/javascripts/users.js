$(function(){
  $("#group_name").on("keyup", function(){
    var input = $(this).val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })
    .done(function(users){
    });
    fail(function() {
    })
  })
})