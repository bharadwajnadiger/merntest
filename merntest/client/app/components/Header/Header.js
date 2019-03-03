import React, { Component } from 'react';
import {Button, Icon} from 'react-materialize'
import { Link } from 'react-router-dom';
import SignInClient from '../../components/Signin/SignInClient';
class Header extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {input : props.token};
  }
    componentDidMount() {}
    render(){
      if(!this.state.input)
{
return (

  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
<a class="navbar-brand" href="/">MERN PROJECT</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse  w-100 order-3 dual-collapse2" id="collapsibleNavbar">
</div>
</nav>
);
}

if(this.state.input)
{
  return (
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
  <a class="navbar-brand" href="/">MERN PROJECT</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse  w-100 order-3 dual-collapse2" id="collapsibleNavbar">
  <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">LOGOUT</a>
      </li>
      </ul>
</div>
</nav>
)
}
    }

}


export default Header;
