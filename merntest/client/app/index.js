import React from 'react';
import { render } from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import SignInClient from './components/Signin/SignInClient';
import SignUpClient from './components/Signin/SignUpClient';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Homes from './components/Signin/Homes'
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={SignInClient}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/signin" component={SignInClient}/>
        <Route path="/signup" component={SignUpClient}/>
        <Route path="/Home" component={Homes}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
