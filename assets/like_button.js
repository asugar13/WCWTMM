'use strict';
console.log('hey');
// import React from "/../node_modules/react";
// import ReactDOM from "/../node_modules/react-dom";

// const e = React.createElement;
//
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import {Dropdown} from 'react-bootstrap';
//
//
// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }
//
//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }
//
//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }}

 // class LoggedButton extends React.Component {
 //   init() {
 //     return (
 //       <Dropdown>
 //          <Dropdown.Toggle>
 //            Profile
 //          </Dropdown.Toggle>
 //
 //          <Dropdown.Menu>
 //            <Dropdown.Item> Logout </Dropdown.Item>
 //          </Dropdown.Menu>
 //      </Dropdown>
 //     )
 //   }
 //
 //   render() {
 //     return this.init();
 //   }
 //
 // }
 //
 //
 //
 //  class Ranking extends React.Component {
 //    init() {
 //
 //      $.get('/top20', function(data){
 //        console.log(data[0].username);
 //        console.log('\n');
 //        for (var i=0; i < data.length; i++) {
 //          var nested_user = $("<tr></tr>");
 //          nested_user.append("<td>" + data[i].username + "</td>");
 //          nested_user.append("<td>" + data[i].country + "</td>");
 //          nested_user.append("<td>" + data[i].amount + "</td>");
 //          nested_user.append("<td>" + data[i].memo + "</td>");
 //          $("#leaderboard").append(nested_user);
 //
 //        }
 //        return;
 //      });
 //    }
 //
 //
 //    render() {
 //          return(
 //            this.init()
 //          )
 //        }
 //      };


      console.log('iam');
  $(document).ready(function(){
    console.log('Im running');
    const domContainer = document.querySelector('#like_button_container');
    const logged_button_container = document.querySelector('#logged_button_container');
    ReactDOM.render(e(LoggedButton), logged_button_container);

    //ReactDOM.render(e(LikeButton), domContainer);
    // $.get('/loggedin', function(data){
    //   if (data.user) {
    //     ReactDOM.render(e(Ranking), domContainer);
    //     ReactDOM.render(e(LoggedButton), logged_button_container);
    //   }
    // })
    });
