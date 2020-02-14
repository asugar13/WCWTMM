var indexPage = {};

indexPage.submitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#LoginForm').serialize();
  $.post('/login', formdata, function(data){
    console.log(data);
  });
};

indexPage.init = function() {
  $('#LoginForm').submit(this.submitHandler);
}

$(document).ready(function(){
  indexPage.init();
});
