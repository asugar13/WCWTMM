var MyProfilePage = {};


MyProfilePage.loader = function() {
  // evt.preventDefault();
  // var formdata = $('#ResetForm').serialize();
  // console.log(typeof formdata);
  // console.log(formdata);
  // console.log
  // var token = document.location.href.split('token=')[1];
  // sendData = formdata + "&token=" + token;
  $.get('/my_account', function(data){
    console.log(data);
    $("#welcome").html("Dear " + data.username +",");
    if (data.amount > 0) {
      $("#text").html(" So far, you have wasted $" + data.amount + " on our website. Keep making that number go up! <br> Feel free to change your memo. For further inquiries, please contact support at: support@whocanwastethemostmoney.com");
    }

    else {
      $("#text").html(" So far, you have not wasted any money on our website...how lame! Feel free to change your memo. For further inquiries, please contact support at: support@whocanwastethemostmoney.com");
    }

    $("#Username").html(data.username);
    $("#Email").html(data.email);
    $("#Country").html(data.country);
    $("#Memo").html(data.memo);
  })
}

MyProfilePage.logout = function(evt) {
  //window.location.
console.log('you clicking me');
  $.get('/logout', function(data){
    console.log(data);
    window.location.href = '/';
  });
}

MyProfilePage.mainMenu = function(evt) {
  evt.preventDefault();
  console.log('i be runnin');
  window.location.href = "/";
}

MyProfilePage.updateMemo = function(evt) {
  evt.preventDefault();
  var toSend =$("#Memo").html();
  console.log(toSend);
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
