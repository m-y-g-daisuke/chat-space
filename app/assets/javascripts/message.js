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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        })
    .fail(function() {
      alert('error');
    });
    setInterval(reloadMessages, 7000);
  };

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