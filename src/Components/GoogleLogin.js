import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { useGoogleLogin } from 'react-google-login'



export default function GoogleLoginButton() {


const responseGoogle = (response) => {
    console.log(response);
}

return(
    <GoogleLogin
        clientId="86910760755-rq7vic2mvntu5k02i261cm0evss7tv7i.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
);}
