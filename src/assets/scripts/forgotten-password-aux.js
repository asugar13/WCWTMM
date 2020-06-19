var ForgottenPasswordPage = {};

ForgottenPasswordPage.ResetHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#ResetForm').serialize();
  $.post('/forgotten_password', formdata, function(data){
    if (data == "email sent") {
      alert('Link sent! Please check your e-mail.');
      window.location.href = "/";
    }
    else {
      alert('Error Occured. Please try again and make sure you enter the e-mail address you signed up with.')
    }
  })
}

ForgottenPasswordPage.init = function() {
  $('#ResetForm').submit(this.ResetHandler);
}

$(document).ready(function(){
  ForgottenPasswordPage.init();
});
