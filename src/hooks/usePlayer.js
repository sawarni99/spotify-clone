import { useEffect, useState } from "react";
import { getAccessToken, getCountry } from "../utils/AuthUtil";
import { CURRENTLY_PLAYING_TRACK, TRANSFER_PLAYBACK, get, parseResponse, put } from "../utils/ApiUtil";

export default function usePlayer() {

    const [playerState, setPlayerState] = useState({
        player: null,
        deviceId: null,
        track: null,
        is_playing: false,
        progress_percent: 0,
        progress_ms: 0,
    });
    const accessToken = getAccessToken();

    // To transfer the media here for playing the song...
    useEffect(() => { 
        if(playerState.deviceId === null) return;

        put(TRANSFER_PLAYBACK, `{"device_ids": ["${playerState.deviceId}"]}`).catch(exception => {
            console.log(exception);
        })

    }, [playerState.deviceId]);
    
    // To connect to the device and play music...
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        let player = null;

        const onPlayerReady = ({ device_id }) => {
            setPlayerState(playerState => {
                return {
                    ...playerState,
                    player: player,
                    deviceId: device_id,
                }
            });
            console.log(`Player is ready with device ID: ${device_id}`);
        }

        const onPlayerNotReady = ({ device_id }) => {
            console.log('Device ID has gone offline: ', device_id);
        }

        const onPlayerStateChange = (state) => {
            if(!state) return;

            player.getCurrentState().then(data => {
                if(data && data.track_window && data.track_window.current_track){
                    get(CURRENTLY_PLAYING_TRACK, `market=${getCountry()}`).then(response => {
                        console.log(response);
                        if(response){
                            setPlayerState((playerState) => {
                                return {
                                    ...playerState,
                                    progress_ms: response.progress_ms,
                                    progress_percent: response.progress_ms/response.item.duration_ms*100,
                                    track: parseResponse(CURRENTLY_PLAYING_TRACK, data.track_window.current_track),
                                    is_playing: !data.paused,
                                }
                            });
                        }
                    }).catch(exception => {
                        console.log(exception)
                        setPlayerState((playerState) => {
                            return {
                                ...playerState,
                                is_playing: !data.paused,
                                track: parseResponse(CURRENTLY_PLAYING_TRACK, data.track_window.current_track),
                            }
                        });
                    });
                };
            })
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

    return playerState;
}