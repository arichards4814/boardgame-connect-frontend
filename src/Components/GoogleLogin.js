import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


export default function GoogleLoginButton() {

const responseGoogle = (response) => {
    console.log(response);
}

return(
    <GoogleLogin
        clientId="boardgame-react-app"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
);}
