import { useEffect } from "react";
import { ACCESS_TOKEN_KEY, CLIENT_ID, EXPIRES_IN_KEY, REDIRECT_URL, REFRESH_TOKEN_KEY, getAccessToken, getExpiresIn, getRefreshToken, setAccessToken, setExpiresIn, setRefreshToken } from "../utils/AuthUtil";
import { getLocalStorage, setLocalStorage } from "../utils/Helper";

export default function useAuth() {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const url = 'https://accounts.spotify.com/api/token';

    // Setting access_token first time...
    useEffect(() => {
        if(code !== undefined && code !== null && code !== "" && getAccessToken() === null) {
            const codeVerifier = getLocalStorage('code_verifier');
            const payload = {
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ID,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URL,
                    code_verifier: codeVerifier
                }),
            }
    
            fetch(url, payload).then((data) =>{
                return data.json();
            }).then((response) => {
                if(response.access_token) {
                    setAccessToken(response.access_token)
                    setRefreshToken(response.refresh_token);
                    setExpiresIn(response.expires_in);
                    setLocalStorage('timestamp', Date.now());
                    window.location.href = REDIRECT_URL;
                }
            }).catch(exception => {
                // TODO :: Need to handle exception...
                console.log(exception);
            }) 
        }
    }, [code]);


    // Deleting and refreshing access token...
    useEffect(() => {
        let interval = null;
        if(getAccessToken() !== null){
            interval = setInterval(() => {
                const previousTime = Number(getLocalStorage('timestamp'));
                const currentTime = Date.now();
                const expiry = getExpiresIn()*1000;
            
                if(currentTime >= previousTime+expiry) {
                    window.localStorage.removeItem('code_verifier');
                    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
                    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
                    window.localStorage.removeItem(EXPIRES_IN_KEY);
                    window.localStorage.removeItem('timestamp');
                    clearInterval(interval);
                    window.location.href = REDIRECT_URL;

                } else if (currentTime+60000 >= previousTime+expiry) {
                    const refreshToken = getRefreshToken();
                    const url = "https://accounts.spotify.com/api/token";

                    const payload = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken,
                            client_id: CLIENT_ID
                        })
                    }

                    fetch(url, payload).then((data) =>{
                        return data.json()
                    }).then((response) => {
                        if(response.access_token) {
                            setAccessToken(response.access_token)
                            setRefreshToken(response.refresh_token);
                            setExpiresIn(response.expires_in);
                            setLocalStorage('timestamp', Date.now());
                        }
                    }).catch(exception => {
                        // TODO :: Need to handle exception...
                        console.log(exception);
                    }) 
                }
            }, 1000);
        }

        return () => {
            if(interval !== null) {
                clearInterval(interval);
            }
        }
    });
}