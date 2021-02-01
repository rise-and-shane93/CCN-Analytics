import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Report from './report';

import { renderButton, checkSignedIn } from "./utils";

import logo from './logo.svg';
import './App.css';

// class App extends Component {
  
//   render() {

//     return (
//       <Router>
//         <div className="App">
//             {!isSignedIn ? (
//             <div id="signin-button"></div>
//           ) : (
//             <div>Coming soon...</div>
//           )}
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route path="/privacy-policy" component={PrivacyPolicy} />
//             <Route path="/privacy-policy" component={TermsOfService} />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

    const updateSignin = (signedIn) => { //(3)
      setIsSignedIn(signedIn);
      if (!signedIn) {
        renderButton();
      }
    };
  
    const init = () => { //(2)
      checkSignedIn()
        .then((signedIn) => {
          updateSignin(signedIn);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      window.gapi.load("auth2", init); //(1)
    });

  return(
    <div className="App">
      {!isSignedIn ? (
        <div id="signin-button"></div>
          ) : (
          <Report />
      )}
    </div>
  );

}

function mapStateToProps(state) {
  const message = state.message;
  return {
    message
  }
}

export default connect(mapStateToProps)(App);
