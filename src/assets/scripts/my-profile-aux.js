var MyProfilePage = {};


MyProfilePage.loader = function() {
  $.get('/my_account', function(data){
    $("#welcome").html("Dear " + data.username +",");
    if (data.amount > 0) {
      $("#text").html(" So far, you have wasted $" + data.amount + " on our website. Keep making that number go up! <br> Feel free to change your memo. For further inquiries, please contact support at: support@whocanwastethemostmoney.com");
    }

    else {
      $("#text").html(" So far, you have not wasted any money on our website...how lame! <br> Feel free to change your memo. For further inquiries, please contact support at: support@whocanwastethemostmoney.com");
    }

    $("#Username").html(data.username);
    $("#Email").html(data.email);
    $("#Country").html(data.country);
    $("#Memo").html(data.memo);
  })
}

MyProfilePage.logout = function(evt) {
  $.get('/logout', function(data){
    window.location.href = '/';
  });
}

MyProfilePage.mainMenu = function(evt) {
  evt.preventDefault();
  window.location.href = "/";
}

MyProfilePage.updateMemo = function(evt) {
  evt.preventDefault();
  var toSend =$("#Memo").html();
  var send = {text: toSend};
  $.post('/update_profile', send, function(data){
    if (data == "success"){
      alert("Your Memo has been updated.");
    }
  })
}

MyProfilePage.init = function() {
  this.loader();
  $('#ResetForm').submit(this.updateMemo);
  $('#MainMenu').click(this.mainMenu);
  $('#logout').click(this.logout);
}

$(document).ready(function(){
  MyProfilePage.init();
});
