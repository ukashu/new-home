import "~base.css"
import "~style.css"
import { Storage } from "@plasmohq/storage"
import { SecureStorage } from "@plasmohq/storage/secure"
import React from 'react'

function Spotify() {
  const [spotifyState, setSpotifyState] = React.useState({
    isLoading: true,
    isLoggedIn: false,
    trackName: '',
    trackAuthor: '',
    trackCoverImg: '',
    trackId: '',
    colors: [[0, 0, 0],[0,0,0]],
    // linear-gradient(321deg, #C00C3C 0%, rgba(0,0,0,1.0) 0.01%, rgba(246,246,246,1.0) 100%) conic-gradient(from 90deg at 50.17% 60.67%, rgba(246,246,246,1.0), rgba(102,103,98,1.0) 70%)
  })
  const currentTrackId = React.useRef('')

  const CLIENT_ID = process.env.PLASMO_PUBLIC_SPOTIFY_CLIENT_ID
  const RESPONSE_TYPE = 'code'
  const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`
  const STATE = 'meet' + Math.random().toString(36).substring(2, 15)
  const SCOPE = 'user-read-playback-state user-modify-playback-state'
  const SHOW_DIALOG = 'false'
  const CODE_CHALLENGE_METHOD = 'S256' //TODO
  let CODE_VERIFIER
  let CODE_CHALLENGE

  let spotify_access_token = ''
  let spotify_refresh_token = ''

  React.useEffect(() => {
    setSongFromStorage()
    dynamicLogin()
  }, [])

  React.useEffect(() => {
    if (!spotifyState.isLoggedIn) {
      return
    }
    getTrack()
    const getTrackData = setInterval(() => {
      getTrack()
    }, 5000)

    return () => clearInterval(getTrackData)
  }, [spotifyState.isLoggedIn])

  const storage = new Storage({
    area: "local"
  })

  const secureStorage = new SecureStorage()

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
        .replace(/=+$/, '')
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
&state=${encodeURIComponent(STATE)}\
&scope=${encodeURIComponent(SCOPE)}\
&show_dialog=${encodeURIComponent(SHOW_DIALOG)}\
&code_challenge_method=${encodeURIComponent(CODE_CHALLENGE_METHOD)}\
&code_challenge=${encodeURIComponent(CODE_CHALLENGE)}`
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
      let code = params.get('code')
      let state = params.get('state')
      if (code === null || state === null || state !== STATE) {
        throw new Error('Authorization error')
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
      if (response.error) { throw new Error(`Error: getToken error`) }
      console.log({loginRes: response})
      await secureStorage.set("spotify_access_token", res.access_token)
      if (response.refresh_token) {
        await secureStorage.set("spotify_refresh_token", response.refresh_token)
      }
      setSpotifyState(prevState => {
        return {
          ...prevState,
          isLoggedIn: true
        }
      })
    } catch(err) {
      setSpotifyState(prevState => {
        return {
          ...prevState,
          isLoggedIn: false
        }
      })
      console.error(err)
    }
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
      if (res.error) { throw new Error(`Error: refresh error`) }
      console.log({refreshRes: res})
      await secureStorage.set("spotify_access_token", res.access_token)
      await secureStorage.set("spotify_refresh_token", res.refresh_token)
      setSpotifyState(prevState => {
        return {
          ...prevState,
          isLoggedIn: true
        }
      })
    } catch(err) {
      secureStorage.remove("spotify_refresh_token")
      setSpotifyState(prevState => {
        return {
          ...prevState,
          isLoggedIn: false
        }
      })
      console.error(err) 
    }
  }

  async function dynamicLogin() {
    try{
      await secureStorage.setPassword("roosevelt")
      const refreshToken = await secureStorage.get('spotify_refresh_token')
      console.log({refreshToken})
      if (refreshToken) {
        //Request access_token with refresh_token
        await refreshPKCE(refreshToken)
        // TODO If error (refresh token expires or sth) it should delete the chrome storage entry TODO
      } else {
        CODE_VERIFIER = generateRandomString(100)
        CODE_CHALLENGE = await generateCodeChallenge(CODE_VERIFIER)
        //Login and request refresh_token
        await loginPKCE()
      }
    } catch(err) { console.error(err) }
  }

  async function setSongFromStorage() {
    const songData: any = await storage.get('songData')
    if (!songData || !songData.name || !songData.artist || !songData.coverImg || !songData.id || !songData.colors) {
      return
    }
    setSpotifyState(prevState => {return {
      ...prevState,
      trackName: songData.name,
      trackAuthor: songData.artist,
      trackCoverImg: songData.coverImg,
      trackId: songData.id,
      colors: songData.colors
    }})
  }

  async function getTrack() {
    try {
      await secureStorage.setPassword("roosevelt")
      const token = await secureStorage.get('spotify_access_token')
      let track_fetch_url = 'https://api.spotify.com/v1/me/player/currently-playing'
      let track_fetch_options = {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
      let res: any = await fetch(track_fetch_url, track_fetch_options)
      res = await res.json()
      if (res.error) { throw new Error(`getTrack error`) }
      //get colors from canvas
      if (res.item.id !== currentTrackId.current) {
        let colors = await getColors(res.item.album.images[1].url)
        setSpotifyState((prevState) => { return {
          ...prevState,
          trackName: res.item.name,
          trackAuthor: res.item.artists[0].name,
          trackCoverImg: res.item.album.images[1].url,
          trackId: res.item.id,
          colors: colors as any
        }})
        await storage.set('songData', {
          name: res.item.name, 
          artist: res.item.artists[0].name, 
          coverImg: res.item.album.images[1].url,
          id: res.item.id,
          colors: colors
        })
        currentTrackId.current = res.item.id
      }
    } catch(err) { 
      secureStorage.remove("spotify_access_token")
      setSpotifyState(prevState => {
        return {
          ...prevState,
          isLoggedIn: false
        }
      })
      console.error(err)
     }
  }

  function getColors(url) {
    return new Promise((resolve, reject) => {
      var img = new Image(); 
      img.src = url
      img.onload = () => {
        var cvs = document.createElement('canvas')
        cvs.width = img.width; cvs.height = img.height
        var ctx = cvs.getContext("2d")
        ctx.drawImage(img, 0, 0);
        let data = ctx.getImageData(170, 130, 1, 1).data;
        let dataSecond = ctx.getImageData(165, 170, 1, 1).data;
        resolve([[data[0],data[1],data[2]],[dataSecond[0],dataSecond[1],dataSecond[2]]])
      }
    })
}

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col rounded-lg">
      <div id="image" key={spotifyState.trackCoverImg} 
      className="min-h-[150px] aspect-video w-full flex flex-col p-2 rounded-lg"
      style={{backgroundImage: `linear-gradient(321deg, #C00C3C 0%, rgba(${spotifyState.colors[0][0]},${spotifyState.colors[0][1]},${spotifyState.colors[0][2]},1.0) 0.01%, rgba(${spotifyState.colors[1][0]},${spotifyState.colors[1][1]},${spotifyState.colors[1][2]},1.0) 100%)`}}>
        <div className="h-2/3 flex flex-row justify-between">
        {spotifyState.trackCoverImg ?
        <img src={spotifyState.trackCoverImg} className="h-full aspect-square rounded drop-shadow-[0_1.2px_1.2px_rgba(200,200,200,1)]"></img>
        :<></>}
          <div className="h-full w-full flex flex-col justify-center items-center text-center font-bold text-sm drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)] overflow-hidden" style={{color: spotifyState.colors[0][1]>175 ? 'rgb(5, 5, 5)' : 'rgb(240, 240, 240)'}}>
            <h3 id="title" className="m-0 truncate max-w-full">{spotifyState.trackName}</h3>
            <p id="artist" className="m-0 truncate max-w-full text-xs">{spotifyState.trackAuthor}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Spotify