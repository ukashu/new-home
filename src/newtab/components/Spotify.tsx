import "~base.css"
import "~style.css"
import { Storage } from "@plasmohq/storage"
import React from 'react'

function Spotify() {
  const [spotifyState, setSpotifyState] = React.useState({
    isLoading: true,
    isLoggedIn: false,
    trackName: '',
    trackAuthor: '',
    trackCoverImg: '',
    trackId: ''
  })

  React.useEffect(() => {
    
  }, [])

  const storage = new Storage({
    area: "local"
  })

  const CLIENT_ID = process.env.PLASMO_PUBLIC_SPOTIFY_CLIENT_ID
  const RESPONSE_TYPE = 'code'
  const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`
  const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15))
  const SCOPE = 'user-read-playback-state user-modify-playback-state'
  const SHOW_DIALOG = encodeURIComponent('false')
  const CODE_CHALLENGE_METHOD = 'S256' //TODO
  let CODE_VERIFIER
  let CODE_CHALLENGE

  let spotify_access_token = ''
  let spotify_refresh_token = ''

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }

  function createSpotifyEndpoint() {
    let oauth2_spotify_url = 
      `https://accounts.spotify.com/authorize\
?client_id=${encodeURIComponent(CLIENT_ID)}\
&response_type=${encodeURIComponent(RESPONSE_TYPE)}\
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}\
&state=${STATE}\
&scope=${encodeURIComponent(SCOPE)}\
&show_dialog=${SHOW_DIALOG}\
&code_challenge_method=${CODE_CHALLENGE_METHOD}\
&code_challenge=${CODE_CHALLENGE}`
    console.log(oauth2_spotify_url)

    return oauth2_spotify_url
  }

  async function loginPKCE() {
    try {
      console.log('login')
      const res: any = await chrome.identity.launchWebAuthFlow({url: createSpotifyEndpoint(), interactive: true})
      //extract code from res url
      console.log({resUrl: res})
      let params = new URLSearchParams(res.split('?')[1])
      console.log({code: params.get('code'), state: params.get('state')})
      let code = res.substring(res.indexOf('code=') + 5)
      code = code.substring(0, code.indexOf('&'))
      console.log({code})
      //extract state from res url
      let state = res.substring(res.indexOf('state=') + 6)
      console.log({state})
      if (state === null || state !== STATE) {
        console.error('Authorization error')
        return
      }
      let spotify_token_fetch_url ='https://accounts.spotify.com/api/token'
      const body_urlencoded = new URLSearchParams({
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code',
        'client_id': CLIENT_ID,
        'code_verifier': CODE_VERIFIER
      });
      let spotify_token_fetch_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body_urlencoded
      }
      let response: any = await fetch(spotify_token_fetch_url, spotify_token_fetch_options)
      response = await response.json()
      console.log({loginRes: response})
      spotify_access_token = response.access_token
      if (response.refresh_token) {
        storage.set("spotify_refresh_token", response.refresh_token)
      }
    } catch(err) { console.error(err)}
  }

  async function refreshPKCE(refresh_token) {
    try {
      console.log('get token from refresh')
      let spotify_token_refresh_url ='https://accounts.spotify.com/api/token'
      const body_urlencoded = new URLSearchParams({
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token',
        'client_id': CLIENT_ID
      });
      let spotify_token_refresh_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body_urlencoded
      }
      let res: any = await fetch(spotify_token_refresh_url, spotify_token_refresh_options)
      res = await res.json()
      if (res.error_description) { //TODO prettier + check if errors get caught in catch instead
        storage.remove("spotify_refresh_token")
        dynamicLogin()
        return
      }
      console.log({refreshRes: res})
      spotify_access_token = res.access_token
      storage.set("spotify_refresh_token", res.refresh_token)
    } catch(err) { console.error(err) }
  }

  async function dynamicLogin() {
    try{
      CODE_VERIFIER = generateRandomString(100)
      CODE_CHALLENGE = await generateCodeChallenge(CODE_VERIFIER)
      const refreshToken = await storage.get('spotify_refresh_token')
      console.log({refreshToken})
      if (refreshToken) {
        //Request access_token with refresh_token
        await refreshPKCE(refreshToken)
        // TODO If error (refresh token expires or sth) it should delete the chrome storage entry TODO
      } else {
        //Login and request refresh_token
        console.log('im here')
        await loginPKCE()
      }
    } catch(err) { console.error(err) }
  }
    

  async function getTrack(spotifyAccessToken) {
    try {
      console.log('getTrackINFO')
      let track_fetch_url = 'https://api.spotify.com/v1/me/player/currently-playing'
      let track_fetch_options = {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${spotifyAccessToken}`,
          'Accept': 'application/json'
        }
      }
      let res: any = await fetch(track_fetch_url, track_fetch_options)
      res = await res.json()
      console.log({getTrackRes: res})
    } catch(err) {
      console.error(err)
    }
}

  return (
    <div className="min-h-[150px] aspect-video w-full bg-blue-200 flex flex-col p-2 rounded-lg">
      <div className="h-2/3 bg-blue-300 flex flex-row justify-between">
        <div className="h-full bg-blue-600 aspect-square"></div>
        <div className="h-full w-full bg-green-300 "></div>
      </div>
      <div className="h-1/3 bg-blue-400 justify-center text-center text-sm">
        <h3 className="m-0 drop-shadow truncate max-w-full">No device is connected</h3>
        <p className="m-0 drop-shadow truncate max-w-full">Great track</p>
        <button onClick={() => dynamicLogin()} className=" bg-green-400 text-black">TESTING login</button>
        <button onClick={() => getTrack(spotify_access_token)} className=" bg-red-400 text-black">TESTING gettrack</button>
      </div>
    </div>
  )
}

export default Spotify