import React, { Component } from 'react';
import 'whatwg-fetch';

import axios from 'axios';
import {
  getfromstorage,
  setInStorage
} from '../../utilities/storage';
import {Link} from 'react-router-dom';
const Client = require('node-rest-client').Client;
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
class Homes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items:'',
      isLoading:false


    };
    this.display = this.display.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
   this.setState({
     isLoading: false,
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
             isLoading: true
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

       isLoaded,
       items,
   isLoading
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
  const{
    isLoaded,
     items,
     isLoading
  } = this.state;
  if(!isLoaded){
  return(
  <div>


    <div class="btn-group">
    <button onClick={this.display} class="btn btn-primary"> Display Details </button>
  </div>
  </div>
);
}
if(isLoading){
  return(

    <Redirect to='/signin'/>


         );
}
   if(isLoaded) {
     return(



  <div className="container">
  <div className="row">
  <button onClick={this.logout} class="btn btn-primary">LOGOUT</button>
          {items.map(item => (
            <div className="col-sm-12 col-md-6 col-xl-4 col-lg-4">
      <div className="card" key={item.author}>
      <img className="card-img-top" src={item.urlToImage}  />
      <div className="card-body">
        <h4 className="card-title">{item.title}</h4>
        <p className="card-text">{item.description}</p>
        <a href={item.url} target="_blank" className="btn btn-primary stretched-link">See news</a>
      </div>
      </div>
      </div>

  ))}

  </div>
  </div>

)
}
}

}

export default Homes;
