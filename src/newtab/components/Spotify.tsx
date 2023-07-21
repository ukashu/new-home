import "~base.css"
import "~style.css"
import { Storage } from "@plasmohq/storage"
import { SecureStorage } from "@plasmohq/storage/secure"
import React from "react"

async function loginPKCE() {
  const CLIENT_ID = process.env.PLASMO_PUBLIC_SPOTIFY_CLIENT_ID
  const RESPONSE_TYPE = "code"
  const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`
  const STATE = "meet" + Math.random().toString(36).substring(2, 15)
  const SCOPE = "user-read-playback-state user-modify-playback-state"
  const SHOW_DIALOG = "false"
  const CODE_CHALLENGE_METHOD = "S256"
  const CODE_VERIFIER = generateRandomString(100)
  const CODE_CHALLENGE = await generateCodeChallenge(CODE_VERIFIER)

  console.log("login")
  const resUrl: any = await chrome.identity.launchWebAuthFlow({
    url: createSpotifyEndpoint(),
    interactive: true
  })
  let resParams = extractCodeAndState(resUrl)
  let res: any = await fetch("https://accounts.spotify.com/api/token", generateTokenFetchOptions(resParams))
  res = await res.json()
  if (res.error || !res.access_token || !res.refresh_token) {
    throw new Error(`getToken error`)
  }
  return { access_token: res.access_token, refresh_token: res.refresh_token }

  function extractCodeAndState(url: string) {
    let params = new URLSearchParams(url.split("?")[1])
    let result = {
      code: params.get("code"),
      state: params.get("state")
    }
    if (result.code === null || result.state === null || result.state !== STATE) {
      throw new Error("Authorization error")
    }
    return result
  }

  function generateRandomString(length: number) {
    let text = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "")
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest("SHA-256", data)

    return base64encode(digest)
  }

  function createSpotifyEndpoint() {
    let oauth2_spotify_url = `https://accounts.spotify.com/authorize\
?client_id=${encodeURIComponent(CLIENT_ID)}\
&response_type=${encodeURIComponent(RESPONSE_TYPE)}\
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}\
&state=${encodeURIComponent(STATE)}\
&scope=${encodeURIComponent(SCOPE)}\
&show_dialog=${encodeURIComponent(SHOW_DIALOG)}\
&code_challenge_method=${encodeURIComponent(CODE_CHALLENGE_METHOD)}\
&code_challenge=${encodeURIComponent(CODE_CHALLENGE)}`

    return oauth2_spotify_url
  }

  function generateTokenFetchOptions(resParams: { code: string; state: string }) {
    let result = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: generateTokenFetchBody(resParams)
    }
    return result
  }

  function generateTokenFetchBody(resParams: { code: string; state: string }) {
    const result = new URLSearchParams({
      code: resParams.code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      code_verifier: CODE_VERIFIER
    })
    return result
  }
}

function Spotify() {
  const [spotifyState, setSpotifyState] = React.useState({
    isLoading: true,
    isLoggedIn: false,
    trackName: "",
    trackAuthor: "",
    trackCoverImg: "",
    trackId: "",
    colors: [
      [0, 0, 0],
      [0, 0, 0]
    ]
  })
  const currentTrackId = React.useRef("")

  React.useEffect(() => {
    setSongFromStorage()
    const login = async () => {
      await secureStorage.setPassword("roosevelt")
      const data = await dynamicLogin()
      if (data && data.access_token && data.refresh_token) {
        await secureStorage.set("spotify_access_token", data.access_token)
        await secureStorage.set("spotify_refresh_token", data.refresh_token)
      }
      setSpotifyState((prevState) => {
        return {
          ...prevState,
          isLoggedIn: true
        }
      })
    }
    login().catch(async (err) => {
      await secureStorage.remove("spotify_access_token")
      await secureStorage.remove("spotify_refresh_token")
      setSpotifyState((prevState) => {
        return {
          ...prevState,
          isLoggedIn: false
        }
      })
      console.error(err)
    })
  }, [])

  React.useEffect(() => {
    if (!spotifyState.isLoggedIn) {
      return
    }
    getTrack()
    const getTrackData = setInterval(async () => {
      getTrack()
    }, 5000)

    return () => clearInterval(getTrackData)
  }, [spotifyState.isLoggedIn])

  const storage = new Storage({
    area: "local"
  })
  const secureStorage = new SecureStorage()

  async function loginWithRefreshToken(refresh_token) {
    const CLIENT_ID = process.env.PLASMO_PUBLIC_SPOTIFY_CLIENT_ID

    console.log("refresh")
    let res: any = await fetch(
      "https://accounts.spotify.com/api/token",
      generateRefreshTokenFetchOptions(refresh_token)
    )
    res = await res.json()
    if (res.error || !res.access_token || !res.refresh_token) {
      throw new Error(`refresh error`)
    }
    return { access_token: res.access_token, refresh_token: res.refresh_token }

    function generateTokenFetchBody(refresh_token) {
      const result = new URLSearchParams({
        refresh_token: refresh_token,
        grant_type: "refresh_token",
        client_id: CLIENT_ID
      })
      return result
    }

    function generateRefreshTokenFetchOptions(refresh_token) {
      const result = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: generateTokenFetchBody(refresh_token)
      }
      return result
    }
  }

  async function dynamicLogin() {
    const accessToken = await secureStorage.get("spotify_access_token")
    if (accessToken) {
      return null
    }
    const refreshToken = await secureStorage.get("spotify_refresh_token")
    if (refreshToken) {
      return await loginWithRefreshToken(refreshToken)
    } else {
      return await loginPKCE()
    }
  }

  async function setSongFromStorage() {
    const songData: any = await storage.get("songData")
    if (!songData || !songData.name || !songData.artist || !songData.coverImg || !songData.id || !songData.colors) {
      return
    }
    setSpotifyState((prevState) => {
      return {
        ...prevState,
        trackName: songData.name,
        trackAuthor: songData.artist,
        trackCoverImg: songData.coverImg,
        trackId: songData.id,
        colors: songData.colors
      }
    })
  }

  async function getTrack() {
    try {
      await secureStorage.setPassword("roosevelt")
      const token = await secureStorage.get("spotify_access_token")
      const trackData = await getTrackData(token)
      if (trackData.item.id !== currentTrackId.current) {
        const colors = await getColors(trackData.item.album.images[1].url)
        setTrack(trackData, colors)
        saveTrack(trackData, colors)
        currentTrackId.current = trackData.item.id
      }
    } catch (err) {
      await secureStorage.remove("spotify_access_token")
      setSpotifyState((prevState) => {
        return {
          ...prevState,
          isLoggedIn: false
        }
      })
      console.error(err)
    }

    function generateTrackFetchOptions(token) {
      let result = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
      return result
    }

    function getColors(url): Promise<number[][]> {
      return new Promise((resolve, reject) => {
        var img = new Image()
        img.src = url
        img.onload = () => {
          var cvs = document.createElement("canvas")
          cvs.width = img.width
          cvs.height = img.height
          var ctx = cvs.getContext("2d")
          ctx.drawImage(img, 0, 0)
          let pixelOne = ctx.getImageData(170, 130, 1, 1).data
          let pixelTwo = ctx.getImageData(165, 170, 1, 1).data
          resolve([
            [pixelOne[0], pixelOne[1], pixelOne[2]],
            [pixelTwo[0], pixelTwo[1], pixelTwo[2]]
          ])
        }
      })
    }

    async function getTrackData(token) {
      let res: any = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        generateTrackFetchOptions(token)
      )
      res = await res.json()
      if (res.error) {
        throw new Error(`getTrack error`)
      }
      return res
    }

    function setTrack(track, colors) {
      setSpotifyState((prevState) => {
        return {
          ...prevState,
          trackName: track.item.name,
          trackAuthor: track.item.artists[0].name,
          trackCoverImg: track.item.album.images[1].url,
          trackId: track.item.id,
          colors: colors
        }
      })
    }

    async function saveTrack(track, colors) {
      await storage.set("songData", {
        name: track.item.name,
        artist: track.item.artists[0].name,
        coverImg: track.item.album.images[1].url,
        id: track.item.id,
        colors: colors
      })
    }
  }

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-col rounded-lg bg-black">
      <div
        id="image"
        key={spotifyState.trackCoverImg}
        className="flex aspect-video min-h-[150px] w-full flex-col rounded-lg p-2"
        style={{
          backgroundImage: `linear-gradient(321deg, #C00C3C 0%, rgba(${spotifyState.colors[0][0]},${spotifyState.colors[0][1]},${spotifyState.colors[0][2]},1.0) 0.01%, rgba(${spotifyState.colors[1][0]},${spotifyState.colors[1][1]},${spotifyState.colors[1][2]},1.0) 100%)`
        }}>
        <div className="flex h-2/3 flex-row justify-between">
          {spotifyState.trackCoverImg ? (
            <img
              src={spotifyState.trackCoverImg}
              className="aspect-square h-full rounded drop-shadow-[0_1.2px_1.2px_rgba(200,200,200,1)]"></img>
          ) : (
            <></>
          )}
          <div
            className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center text-sm font-bold drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)]"
            style={{
              color: spotifyState.colors[0][1] > 175 ? "rgb(5, 5, 5)" : "rgb(240, 240, 240)"
            }}>
            <h3 id="title" className="m-0 max-w-full truncate">
              {spotifyState.trackName}
            </h3>
            <p id="artist" className="m-0 max-w-full truncate text-xs">
              {spotifyState.trackAuthor}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spotify
