import React, { useEffect, useState } from 'react'
import { generateRandomString, sha256, base64encode, setLocalStorage, getLocalStorage } from '../../utils/Helper';
import { REDIRECT_URL, CLIENT_ID, SCOPES, CODE_VERIFIER_KEY } from '../../utils/AuthUtil';
import './Login.css'
import Loading from '../../components/loading/Loading';

export default function Login() {

  const [loginClicked, setLoginClicked] = useState(false);

  const onLoginClicked = () => {
    setLoginClicked(true);
  }

  const login = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
    const scope = SCOPES.join(' ');
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    setLocalStorage(CODE_VERIFIER_KEY, codeVerifier);

    const params =  {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URL,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  useEffect(() => {
    if(loginClicked) {
      login();
    }
  }, [loginClicked]);

  return (
    <div className='login-page'>
        <img className='login-page-img' src='./assets/icons/spotify.png' alt='Spotify' />
        <span className='login-page-desc'>This is a clone of Spotify made for educational purposes</span>
        { loginClicked || getLocalStorage('code_verifier') !== null ?
          <Loading /> :
          <button className='login-button' onClick={onLoginClicked}>Login</button>
        }
    </div>
  )
}
