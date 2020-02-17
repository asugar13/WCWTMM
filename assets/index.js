var indexPage = {};

indexPage.submitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#LoginForm').serialize();
  $.post('/login', formdata, function(data){
    console.log(data);
    if (data == "Successful Login")  {
      $.get('/', function(){
        console.log("I did");
      })
    }
  });
};

indexPage.init = function() {
  $('#LoginForm').submit(this.submitHandler);
}

$(document).ready(function(){
  indexPage.init();
});
