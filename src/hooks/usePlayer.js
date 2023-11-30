import { useEffect, useState } from "react";
import { DEVICE_ID, getAccessToken } from "../utils/AuthUtil";
import { removeLocalStorage, setLocalStorage } from "../utils/Helper";

export default function usePlayer() {

    const [player, setPlayer] = useState(null);
    const accessToken = getAccessToken();
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        let player = null;

        const onPlayerReady = ({ device_id }) => {
            setLocalStorage(DEVICE_ID, device_id);
            setPlayer(player);
            console.log(`Player is ready with device ID: ${device_id}`);
        }

        const onPlayerNotReady = ({ device_id }) => {
            removeLocalStorage(DEVICE_ID);
            console.log('Device ID has gone offline: ', device_id);
        }

        const onPlayerStateChange = (state) => {
            console.log('State Changed.');
        }

        const onInitializationError = ({message}) => {
            console.error('Failed to initialize', message);
        }

        const onAuthenticationError = ({message}) => {
            console.error('Failed to authenticate', message);
        }

        const onAccountError = ({ message }) => {
            console.error('Failed to validate Spotify account', message);
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            if(accessToken === null) return;

            player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: callback => {
                    callback(accessToken);
                },
                volume: 0.5,
            });
            
            player.addListener('ready', onPlayerReady);
            player.addListener('not_ready', onPlayerNotReady);
            player.addListener('player_state_changed', onPlayerStateChange);
            
            // Listening to Errors...
            player.addListener('initialization_error', onInitializationError);
            player.addListener('authentication_error', onAuthenticationError);
            player.addListener('account_error', onAccountError);
            
            // Setting Connection...
            console.log('Connecting player.');
            player.setName("Spotify Clone");
            player.connect();

            return () => {
                if(player !== null){
                    player.removeListener('ready', onPlayerReady);
                    player.removeListener('not_ready', onPlayerNotReady);
                    player.removeListener('player_state_changed', onPlayerStateChange);
                    player.removeListener('initialization_error', onInitializationError);
                    player.removeListener('authentication_error', onAuthenticationError);
                    player.removeListener('account_error', onAccountError);
                    player.disconnect();
                }
            }
        }
    }, [accessToken]);

    return player;
}