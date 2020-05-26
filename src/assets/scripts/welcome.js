var indexPage = {};

indexPage.LoginSubmitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#LoginForm').serialize();
  console.log(formdata);
  $.post('/login', formdata, function(data){
    console.log(data);
    if (data == "Successful Login")  {
      console.log('nice')
      window.location.href = '/';
    }
  });
};




indexPage.AmountHandler = function(evt) {
  evt.preventDefault();
  //var formdata = JSON.stringify($("#AmountForm").serializeArray());
  // console.log(formdata);
  // console.log(typeof formdata);
  // console.log(formdata['value']);

  var amount = this.amount;
  console.log(amount.value);

  paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'AZwHIzW2wHVO_M8CiZdNaUpRDy4SD-qQahVDdnfrk76LNituycxpZO8Ttdui8CgpzGQmog7dgRHYnZLX',
      production: 'ASzBP2eqEFwcajYZA-h9POWUHjrdg3WTGpofZhR6DNPZhuL1wtzV6S9_d4nbRBHHaJ49vBJBjsD8-37r'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment: function(data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: amount.value,
            currency: 'USD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize: function(data, actions) {
      return actions.payment.execute().then(function() {
        // Show a confirmation message to the buyer
        window.alert('Thank you for your purchase!');

        var sendAmount = {total: amount.value};
        $.post("/updateamount", sendAmount, function(data){
          if (data == "Amount Updated Successfully") {
            console.log("done");
            window.location.href = "/";
          }

        }
        )
        //write code here to handle effective payment

      });
    }
  }, '#paypal-button');
}

indexPage.MyAccountClickHandler = function(evt) {
  evt.preventDefault();
  console.log('hiii');
}

indexPage.SignUpSubmitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#SignUpForm').serialize();
  console.log(typeof formdata);
  console.log(formdata);

  $.post('/signup', formdata, function(data){
    if (data == "Successful SignUp") {
      window.location.href= '/';
      console.log('working');
    }
  })
}

indexPage.init = function() {
  $('#LoginForm').submit(this.LoginSubmitHandler);
  $('#SignUpForm').submit(this.SignUpSubmitHandler);
  $('#AmountForm').submit(this.AmountHandler);
  $('#MyAccountbtn').onClick(this.MyAccountClickHandler);

  // $.get('/top20', function(data){
  //   console.log(data[0].username);
  //   console.log('\n');
  //   for (var i=0; i < data.length; i++) {
  //     var nested_user = $("<tr></tr>");
  //     nested_user.append("<td>" + data[i].username + "</td>");
  //     nested_user.append("<td>" + data[i].country + "</td>");
  //     nested_user.append("<td>" + data[i].amount + "</td>");
  //     nested_user.append("<td>" + data[i].memo + "</td>");
  //     $("#leaderboard").append(nested_user);
  //
  //   }
  // });
}

//console.log('show me luve');


  $(document).ready(function(){
    console.log('show me love');
    indexPage.init();
    console.log('now we talking');



  });
