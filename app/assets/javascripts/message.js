$(function(){

  function buildHTML(message){
    if (message.image) {
      var html =
       `<div class="message--info">
          <div class="message--info__name">
            ${message.user_name}
          </div>
          <div class="message--info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message--posts">
          <div class="message--text">
            ${message.content}
          </div>
            <img class="message--image" src=${message.image} >
        </div>` 
    } else {
      var html = 
        `<div class="message--info">
          <div class="message--info__name">
            ${message.user_name}
          </div>
          <div class="message--info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message--text"> 
          ${message.content}
        </div>`
    }
    return html
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".contents").append(html);
      $("form")[0].reset();
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $(".message--submit__btn").prop("disabled",false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})