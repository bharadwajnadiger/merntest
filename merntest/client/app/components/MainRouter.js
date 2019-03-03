import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home} from './Home/Home'
import {SignInClient} from './Signin/SignInClient'
class MainRouter extends Component {
  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    /*const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }*/
  }

  render() {
    return (<div>

      <Switch>
        <Route exact path="/" component={Home}/>
          <Route path="/signin" component={SignInClient}/>
      </Switch>
    </div>)
  }
}

export default MainRouter
