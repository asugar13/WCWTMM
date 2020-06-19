var indexPage = {};

indexPage.LoginSubmitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#LoginForm').serialize();
  $.post('/login', formdata, function(data){
    if (data == "Successful Login")  {
      window.location.href = '/';
    }
  });
};

indexPage.AmountHandler = function(evt) {
  evt.preventDefault();
  var amount = this.amount;

  paypal.Button.render({
    // Configure environment
    env: 'production',
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
            window.location.href = "/";
          }

        }
        )
        //write code here to handle effective payment ("paypal")

      });
    }
  }, '#paypal-button');
}

indexPage.MyAccountClickHandler = function(evt) {
  evt.preventDefault();
}

indexPage.SignUpSubmitHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#SignUpForm').serialize();

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
  $('#MyAccountbtn').click(this.MyAccountClickHandler);
}

  $(document).ready(function(){
    indexPage.init();
  });
