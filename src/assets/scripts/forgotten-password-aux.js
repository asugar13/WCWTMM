var ForgottenPasswordPage = {};


ForgottenPasswordPage.ResetHandler = function(evt) {
  evt.preventDefault();
  var formdata = $('#ResetForm').serialize();
  console.log(typeof formdata);
  console.log(formdata);
  $.post('/forgotten_password', formdata, function(data){
    console.log(data);
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


// const nodemailer = require("nodemailer");
// let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'asier.ugartetxe@gmail.com',
//         pass: 'Testing123?'
//     }
// });
//
// let mailDetails = {
//     from: 'asier.ugartetxe@gmail.com',
//     to: 'sierplang@gmail.com',
//     subject: 'Test mail',
//     text: 'Node.js testing mail for GeeksforGeeks'
// };
//
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });
//

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();
//
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });
//
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   });
//
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }
//
//
$(document).ready(function(){
  ForgottenPasswordPage.init();


});
