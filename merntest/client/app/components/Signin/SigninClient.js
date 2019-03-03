import React, { Component } from 'react';
import 'whatwg-fetch';

import axios from 'axios';
import {
  getfromstorage,
  setInStorage
} from '../../utilities/storage';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
const Client = require('node-rest-client').Client;
import { Button } from 'react-bootstrap';
class SignInClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      token: '',
      signUpError:'',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpEmail:'',
      signUpPassword:'',
      signUpFirstname:'',
      signUpLastname:'',
      helloworld:false,
      url:'',
      limit:false,
      isLoaded: false,
      items:'',
      user:'',
      failurealert: false
    };
    this.onTextboxChangesignInEmail = this.onTextboxChangesignInEmail.bind(this);
    this.onTextboxChangesignInPassword = this.onTextboxChangesignInPassword.bind(this);
    this.onTextboxChangesignUpEmail = this.onTextboxChangesignUpEmail.bind(this);
    this.onTextboxChangesignUpPassword = this.onTextboxChangesignUpPassword.bind(this);
    this.onTextboxChangesignUpFirstname = this.onTextboxChangesignUpFirstname.bind(this);
    this.onTextboxChangesignUpLastname = this.onTextboxChangesignUpLastname.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
    this.display = this.display.bind(this);

  }

  componentDidMount() {
   const obj = getfromstorage('the_main_app');

   if(obj && obj.token){
      const {token} = obj;
     fetch('/api/account/verify?token'+ token).then(res=>res.json()).then(json =>{
       if(json.success){
         this.setState({
           token : token,
           isLoading : true
         })
       }
         else{
           this.setState({
             isLoading : false
           })
         }
         })
       }

   else{
     this.setState({
       isLoading : false
     });
   }
  }
   onTextboxChangesignInEmail(event){
     this.setState({
       signInEmail: event.target.value,
     });
   }

   onTextboxChangesignInPassword(event){
     this.setState({
       signInPassword: event.target.value,
     });
   }

   onTextboxChangesignUpEmail(event){
     this.setState({
       signUpEmail: event.target.value,
     });
   }
   onTextboxChangesignUpFirstname(event){
     this.setState({
       signUpFirstname: event.target.value,
     });
   }
   onTextboxChangesignUpPassword(event){
     this.setState({
       signUpPassword: event.target.value,
     });
   }
   onTextboxChangesignUpLastname(event){
     this.setState({
       signUpLastname: event.target.value,
     });
   }

   onSignIn(){
     const {
        signInEmail,
        signInPassword,
        user,
        failurealert
      } = this.state;
      this.setState({
        isLoading: true,
      });
      // Post request to backend
      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInPassword: '',
              signInEmail: '',
              token: json.token,
              user: json.user,

            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false,
                failurealert:true
            });
          }
        });

   }
   logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getfromstorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
display(){
  //alert("SUCCESS");
  const {
     url,
     limit,
     isLoaded,
     items,
     user
   } = this.state;
   var urlNews = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=120407c531b74a28ba605af5ad1031b5';
var req = new Request(urlNews);
fetch(req)
.then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })

).then(res => {
    console.log(res.status, res.data.articles[0]);
  //items = res.data.articles;
    this.setState({
    isLoaded :true,
    items: res.data.articles
    })
}));

    }



   render() {
const {     isLoading,
       token,
       signUpError,
       signInError,
       signInEmail,
       signInPassword,
       signUpEmail,
       signUpPassword,
       signUpFirstname,
       signUpLastname,
       helloworld,
       url,
       items,
       isLoaded,
       user,
       failurealert
     } = this.state;
     if(isLoading){
       return (<div><p>LOADING....</p></div>);
     }

     if(failurealert){
       return (<div class="container">

         <form >
         <h2>SignIn</h2>

          <div class="alert alert-warning">
   <strong>{signInError}</strong>
   </div>
         <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" id="email" class="form-control" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangesignInEmail}/>
    </div>
    <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" id="pwd" class="form-control" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangesignInPassword}/>
    </div>
    <div class="form-group">
    <button type="button" onClick={this.onSignIn} class="btn btn-primary">Submit</button>
    </div>
    <div class="form-group">
    <a href="/signup" >CREATE NEW ACCOUNT</a>
    </div>
    </form>
          </div>

        );
     }

     if(!token){
       return (<div class="container">

         <form >
         <h2>SignIn</h2>
          <p>{signInError}</p>
         <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" id="email" class="form-control" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangesignInEmail}/>
    </div>
    <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" id="pwd" class="form-control" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangesignInPassword}/>
    </div>
    <div class="form-group">
    <button type="button" onClick={this.onSignIn} class="btn btn-primary">Submit</button>
    </div>
    <div class="form-group">
    <a href="/signup" >CREATE NEW ACCOUNT</a>
    </div>
 </form>
          </div>

        );
     }


 if(token){
   return(

     <Redirect to='/Home'/>


          );

   }
   }
}

export default SignInClient;
