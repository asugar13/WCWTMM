var ResetPasswordPage = {};


ResetPasswordPage.ResetHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#ResetForm').serialize();
  console.log(typeof formdata);
  console.log(formdata);
  console.log
  var token = document.location.href.split('token=')[1];
  sendData = formdata + "&token=" + token;
  $.post('/reset_password', sendData, function(data){
    if (data == "Password Reset Successfully") {
      alert("Successfully Reset Your Password");
      window.location.href = '/';
    }
  })
}


ResetPasswordPage.init = function() {
  $('#ResetForm').submit(this.ResetHandler);
}

$(document).ready(function(){
  ResetPasswordPage.init();
});
