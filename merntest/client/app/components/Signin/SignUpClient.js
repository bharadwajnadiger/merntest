import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getfromstorage,
  setInstorage
} from '../../utilities/storage';
import {Link} from 'react-router-dom';
class SignUpClient extends Component {

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
      redirectTo: '/signin',
      user:'',
      signupalert:'',
      alerts:false,
      alerts1:false
    };
    this.onTextboxChangesignInEmail = this.onTextboxChangesignInEmail.bind(this);
    this.onTextboxChangesignInPassword = this.onTextboxChangesignInPassword.bind(this);
    this.onTextboxChangesignUpEmail = this.onTextboxChangesignUpEmail.bind(this);
    this.onTextboxChangesignUpPassword = this.onTextboxChangesignUpPassword.bind(this);
    this.onTextboxChangesignUpFirstname = this.onTextboxChangesignUpFirstname.bind(this);
    this.onTextboxChangesignUpLastname = this.onTextboxChangesignUpLastname.bind(this);
    //this.onSignIn = this.onSignIn.bind(this);
   this.onSignUp = this.onSignUp.bind(this);

  }

  componentDidMount() {
   const token = getfromstorage('the_main_app');
   if(token){
     fetch('/api/account/verify?token'+ token).then(res=>res.json()).then(json =>{
       if(json.success){
         this.setState({
           token : token,
           isLoading : false
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

   onSignUp(){
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstname,
      signUpLastname,
      redirectTo,
      user,
      signupalert,
      alerts,
      alerts1
    } = this.state;
     fetch('/api/account/signup', {
     //  console.log('body',body);
       method: 'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
         firstName : signUpFirstname,
         lastName:signUpLastname,
         email:signUpEmail,
         password:signUpPassword
       }),
     }).then(res => res.json())
     .then(json => {
       if(json.success){
      this.setState({
           signUpError: json.message,
           isLoading: false,
           signUpEmail:'',
           signUpPassword:'',
           signUpFirstname:'',
           signUpLastname:'',
             redirectToReferrer: true,
             redirectTo: '/signin',
             signupalert:'SUCCESS LOGIN',
             alerts:true

         });

       }
       else{
       this.setState({
         signUpError: json.message,
         isLoading: false,
         alerts1:true
        // redirectToReferrer: false
       })
     }
    /* {renderIf(redirectToReferrer)(
       <Redirect to="/signin" />,
     )}*/

   });



  };

   render() {
     const{isLoading,
       token,
       signUpError,
       signInError,
       signInEmail,
       signInPassword,
       signUpEmail,
       signUpPassword,
       signUpFirstname,
       signUpLastname,
       redirectToReferrer,
       signupalert,
       alerts, alerts1
     } = this.state;
     if(isLoading){
       return (<div><p>LOADING....</p></div>);
     }


if(alerts){
  return (
    <div class="container">

      <form >
      <h2>SignUp</h2>


       <div class="alert alert-success">
<strong>{signUpError}</strong>
</div>
       <div class="form-group">
  <label for="firstname">FirstName:</label>
  <input type="text" id="firstname" class="form-control" placeholder="firstname" value={signUpFirstname}  onChange={this.onTextboxChangesignUpFirstname}/>
  </div>
  <div class="form-group">
  <label for="lastname">LastName:</label>
  <input type="text" id="lastname" class="form-control" placeholder="lastname" value={signUpLastname}  onChange={this.onTextboxChangesignUpLastname}/>
  </div>
  <div class="form-group">
<label for="email">Email address:</label>
<input type="email" id="email" class="form-control" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangesignUpEmail}/>
</div>
<div class="form-group">
<label for="pwd">Password:</label>
<input type="password" id="pwd" class="form-control" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangesignUpPassword}/>
</div>
<div class="form-group">
<a href="/signin" >LOGIN IF ACCOUNT EXISTS</a>
</div>
<button type="button" onClick={this.onSignUp} class="btn btn-primary">Submit</button>
</form>
</div>


    )
}

if(alerts1){
  return (
    <div class="container">

      <form >
      <h2>SignUp</h2>


       <div class="alert alert-warning">
<strong>{signUpError}</strong>
</div>
       <div class="form-group">
  <label for="firstname">FirstName:</label>
  <input type="text" id="firstname" class="form-control" placeholder="firstname" value={signUpFirstname}  onChange={this.onTextboxChangesignUpFirstname}/>
  </div>
  <div class="form-group">
  <label for="lastname">LastName:</label>
  <input type="text" id="lastname" class="form-control" placeholder="lastname" value={signUpLastname}  onChange={this.onTextboxChangesignUpLastname}/>
  </div>
  <div class="form-group">
<label for="email">Email address:</label>
<input type="email" id="email" class="form-control" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangesignUpEmail}/>
</div>
<div class="form-group">
<label for="pwd">Password:</label>
<input type="password" id="pwd" class="form-control" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangesignUpPassword}/>
</div>
<div class="form-group">
<a href="/signin" >LOGIN IF ACCOUNT EXISTS</a>
</div>
<button type="button" onClick={this.onSignUp} class="btn btn-primary">Submit</button>
</form>
</div>


    )
}

     if(!token){
       return (
         <div class="container">

           <form >
           <h2>SignUp</h2>


            <div class="form-group">
       <label for="firstname">FirstName:</label>
       <input type="text" id="firstname" class="form-control" placeholder="firstname" value={signUpFirstname}  onChange={this.onTextboxChangesignUpFirstname}/>
       </div>
       <div class="form-group">
       <label for="lastname">LastName:</label>
       <input type="text" id="lastname" class="form-control" placeholder="lastname" value={signUpLastname}  onChange={this.onTextboxChangesignUpLastname}/>
       </div>
       <div class="form-group">
  <label for="email">Email address:</label>
  <input type="email" id="email" class="form-control" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangesignUpEmail}/>
  </div>
  <div class="form-group">
  <label for="pwd">Password:</label>
  <input type="password" id="pwd" class="form-control" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangesignUpPassword}/>
  </div>
  <div class="form-group">
  <a href="/signin" >LOGIN IF ACCOUNT EXISTS</a>
  </div>
  <button type="button" onClick={this.onSignUp} class="btn btn-primary">Submit</button>
            </form>
</div>
        /* <div>

         <form>
         <p>{signUpError}</p>
   <p>SignUp</p>
   <label>FirstName</label> <br/>
   <input type="text" placeholder="FirstName" value={signUpFirstname}  onChange={this.onTextboxChangesignUpFirstname}/><br/>
   <label>LastName</label> <br/>
   <input type="text" placeholder="LastName" value={signUpLastname}  onChange={this.onTextboxChangesignUpLastname}/><br/>
   <label>Email</label> <br/>
   <input type="text" placeholder="Email" value={signUpEmail}  onChange={this.onTextboxChangesignUpEmail}/><br/>
   <label>Password</label> <br/>
   <input type="Password" placeholder="Password" value={signUpPassword}  onChange={this.onTextboxChangesignUpPassword}/><br/>
   <button onClick={this.onSignUp}>SignUp</button>

</form>
          </div>*/

         )
     }

   }
}

export default SignUpClient;
