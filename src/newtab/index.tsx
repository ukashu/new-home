import "~base.css"
import "~style.css"
import Spotify from "./components/Spotify"
import Events from "./components/Events"
import Todos from "./components/Todos"
import Quotes from "./components/Quotes"
import Habits from "./components/Habits"
import Websites from "./components/Websites"
import Shortcuts from "./components/Shortcuts"
import Initializer from "./components/reusable/Initializer"
import { Storage } from "@plasmohq/storage"
import React from "react"

import newTabBackground from '../resources/newTabBackground.svg'

function IndexNewtab() {
  const [initialized, setInitialized] = React.useState({
    spotifyOn: false,
    googleOn: false
  })

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    checkInitialization()
  }, [])

  const checkInitialization = async() => {
    try {
      const spotifyOn = await storage.get('spotifyOn')
      const googleOn = await storage.get('googleOn')
      setInitialized({
          spotifyOn: spotifyOn ? true : false,
          googleOn: googleOn ? true : false
      })
    } catch(err) { console.error(err) }
  }

  const initialize = async(name) => {
    try {
      await storage.set(`${name}On`, true)
      setInitialized(prevState => {
        return {
          ...prevState,
          [`${name}On`]: true
        }
      })
    } catch(err) { console.error(err) }
  }

  return (
    <div className="flex flex-row justify-between h-screen p-2 gap-2 font-[Inter]">
      <img src={newTabBackground} alt="newTabBackground" style={{
        'position': 'absolute',
        'zIndex': '-999',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%'
      }}/>
      <section id="left" className="flex flex-col items-center w-1/5 min-w-[300px] h-100% gap-2">
        <Todos/>
        <Quotes quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." author="Lorem Ipsum"/>
      </section>
      <section id="center" className="flex flex-col items-center w-3/5 min-w-[400px] h-100% gap-2">
        <Habits/>
        <Websites/>
        <Shortcuts/>
      </section>
      <section id="right" className="flex flex-col items-center justify-between w-1/5 min-w-[300px] h-100% gap-2">
        {initialized.spotifyOn ? <Spotify/> : <Initializer name="spotify" initialize={() => initialize('spotify')}/>}
        {initialized.googleOn ? <Events/> : <Initializer name="google" initialize={() => initialize('google')}/>}
      </section>
    </div>
  )
}

export default IndexNewtab