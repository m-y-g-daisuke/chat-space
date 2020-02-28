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
          <img class="message--image" ${message.image} >
        </div>` //メッセージに画像が含まれる場合のHTMLを作る
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
        </div>`//メッセージに画像が含まれない場合のHTMLを作る
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
    })
  })
})