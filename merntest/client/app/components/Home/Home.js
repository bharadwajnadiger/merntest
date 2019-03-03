import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getfromstorage,
  setInstorage
} from '../../utilities/storage'
class Home extends Component {
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
      limit:false,
      isLoaded: false,
      items:'',
      user:''
    };
    this.onTextboxChangesignInEmail = this.onTextboxChangesignInEmail.bind(this);
    this.onTextboxChangesignInPassword = this.onTextboxChangesignInPassword.bind(this);
    this.onTextboxChangesignUpEmail = this.onTextboxChangesignUpEmail.bind(this);
    this.onTextboxChangesignUpPassword = this.onTextboxChangesignUpPassword.bind(this);
    this.onTextboxChangesignUpFirstname = this.onTextboxChangesignUpFirstname.bind(this);
    this.onTextboxChangesignUpLastname = this.onTextboxChangesignUpLastname.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
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
   signUpLastname
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
        signUpLastname:''
      })
    }
    else{
    this.setState({
      signUpError: json.message,
      isLoading: false,
    })
  }
  })

}
onSignIn(){
const {
  signInPassword,
  signInEmail
} = this.state;
fetch('/api/account/signin', {
//  console.log('body',body);
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({
    email:signInEmail,
    password:signInPassword
  }),
}).then(res => res.json())
.then(json => {
  if(json.success){
    this.setState({
      signInError: json.message,
      isLoading: false,
      signInPassword:'',
      signInEmail:'',

    })
  }
  else{
  this.setState({
    signUpError: json.message,
    isLoading: false,
  })
}
})

}
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
      isLoaded
    } = this.state;
    if(isLoading){
      return (<div><p>LOADING....</p></div>);
    }
    if(!token){
      return (<div class="container">

      <h3>Bottom Fixed Navbar</h3>
<p>A fixed navigation bar stays visible in a fixed position (top or bottom) independent of the page scroll.</p>
<h1>Scroll this page to see the effect</h1>
         </div>)
    }
    if (isLoaded) {
 return(
   //<p>{items}</p>
   <div>
   <p>hi {user},</p>
   <ul>
             {items.map(item => (
               <li key={item.author}>
               {item.title}
               </li>
             ))}
           </ul>

<button onClick={this.logout}>Logout</button>
</div>
 )
  }
if(token){

    return(
      <div>
 <p>Account</p>
<button onClick={this.display}> Display Details </button>
 <button onClick={this.logout}>Logout</button>
</div>
    );
  }
    return (
    <div><p>Account</p></div>
    );
  }
}

export default Home;
