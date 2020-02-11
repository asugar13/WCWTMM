var indexPage = {};

indexPage.submitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#SignUpForm').serialize();
  console.log("supsup index.js");
  $.post('/signup', formdata, function(data){
    console.log('done');
  });
};

indexPage.init = function() {
  $('#SignUpForm').submit(this.submitHandler);
}

$(document).ready(function(){ 
  console.log("hello?");

  indexPage.init();
});
