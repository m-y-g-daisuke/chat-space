$(function(){
  
 
  function buildHTML(message){
    if (message.content && message.image) {
      var html =
      `<div class="message" data-message-id=${message.id} ${message.id}>
        <div class="message--info">
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
        </div>
      </div>` 
    } else if (message.content){
      var html = 
      `<div class="message" data-message-id=${message.id} ${message.id}>
        <div class="message--info">
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
        </div>
      </div>`
    } else{
      var html =
      `<div class="message" data-message-id=${message.id} ${message.id}>
        <div class="message--info">
          <div class="message--info__name">
            ${message.user_name}
          </div>
          <div class="message--info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message--posts">
          <img class="message--image" src=${message.image} >
        </div>
      </div>`
    }
    return html
  }

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.contents').append(insertHTML);
        $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: "json",
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})