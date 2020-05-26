

import Ranking from "./assets/components/ranking.js";
import LoggedButton from "./assets/components/myprofile.js";


import img from './assets/css/bgimage.png';


import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

const e = React.createElement;



//render the profile button and delete the login and sign up forms if there is a session.
$.get('/loggedin', function(data){
  if (data.user) {
    console.log("session detected");
    $("#SignUpForm").hide();
    $("#LoginForm").hide();
    $("#paypal-button").show();
    $("#AmountForm").show();
    $("#Rules").show();
//
    $("#header").css("top", "-92px");
    $("#leaderboard").css("top", "-100px");

    //renders profile button
    ReactDOM.render(<LoggedButton />, document.getElementById("ProfileMenu"));
  }
  else {
    console.log("no session detected")
    $("#SignUpForm").show();
    $("#LoginForm").show();
    $("#paypal-button").hide();
    $("#AmountForm").hide();
    $("#Rules").hide();
  }
})

//render the
ReactDOM.render(<Ranking />, document.getElementById("leaderboard"));


import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/scripts/welcome.js'
// welcome.html stylesheet. Need to have it after the components rendering (or else
//the styling comes from react-boostrap
import "./assets/css/welcome.css";


  // $(document).ready(function(){
  //   console.log('Im running');
  //   const domContainer = document.querySelector('#like_button_container');
  //   const logged_button_container = document.querySelector('#logged_button_container');
  //   ReactDOM.render(e(LikeButton), domContainer);
  //   $.get('/loggedin', function(data){
  //     if (data.user) {
  //       ReactDOM.render(e(Ranking), domContainer);
  //       ReactDOM.render(e(LoggedButton), logged_button_container);
  //     }
  //   })
  //   });
