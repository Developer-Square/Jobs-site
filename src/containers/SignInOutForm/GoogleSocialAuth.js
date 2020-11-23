import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

class GoogleSocialAuth extends Component{
    render() {
        const googleResponse = (response) => {
            console.log(response);
        }
        return (
            <div className="App">
                <h1>Continue With Google</h1>

                <GoogleLogin
                    clientId    ="948225711672-3553sbnjkq2kcuma94grhd4hl7935ahp.apps.googleusercontent.com"
                    buttonText  ="Continue with Google"
                    onSuccess   = {responseGoogle}
                    onFailure   = {responseGoogle}
                />
            </div>
        );
    }
}

export default GoogleSocialAuth;