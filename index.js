var indexPage = {};

indexPage.submitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#SignUpForm').serialize();
  console.log(formdata);
  console.log(JSON.stringify(formdata))
  $.post('/signup', formdata, function(data){
    console.log('done');
  });
};

indexPage.init = function() {
  $('#SignUpForm').submit(this.submitHandler);
}

$(document).ready(function() {
  indexPage.init();
});
