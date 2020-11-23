import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookSocialAuth extends Component {
  render() {
    const fbResponse = (response) => {
      console.log(response);
    }
    return (
      <div className="App">
        <h1>Continue with Facebook</h1>

        <FacebookLogin
          textButton    = "Continue with Facebook"
          appId         = "2950169338543132"
          fields        = "name,email,picture"
          callback      = {fbResponse}
        />
      </div>
    );
  }
}

export default FacebookSocialAuth;