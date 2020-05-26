import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'popper.js'

import Dropdown from 'react-bootstrap/Dropdown';

class LoggedButton extends React.Component {
  logout() {
    $.get('/logout', function(data){
      window.location.href = "/";
    });
  }


myProfile() {
  window.location.href = '/my_profile';
  // $.get('/my_profile', function(data){
  //
  // })
}



  init() {
    var style = {  color: "black", "background-color": "#FFC312", "border-color": "#FFC312" };
    return (
      <Dropdown>
         <Dropdown.Toggle style={style}>
           Profile
         </Dropdown.Toggle>

         <Dropdown.Menu>
           <Dropdown.Item onClick={this.logout}> Logout </Dropdown.Item>
           <Dropdown.Item onClick={this.myProfile} id="MyAccountbtn"> My Account </Dropdown.Item>
         </Dropdown.Menu>
     </Dropdown>
    )
  }


  render() {
    return this.init();
  }

}

export default LoggedButton;
