import "~base.css"
import "~style.css"
import Spotify from "./components/Spotify"
import Events from "./components/Events"
import Todos from "./components/Todos"
import Quotes from "./components/Quotes"
import Habits from "./components/Habits"
import Websites from "./components/Websites"
import Shortcuts from "./components/Shortcuts"

import newTabBackground from '../resources/newTabBackground.svg'
import { useState } from "react"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-row justify-between h-screen p-2 gap-2">
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
      <section id="center" className="flex flex-col items-center w-3/5 h-100% gap-2">
        <Habits/>
        <Websites/>
        <Shortcuts/>
      </section>
      <section id="right" className="flex flex-col items-center justify-between w-1/5 min-w-[300px] h-100% gap-2">
        <Spotify/>
        <Events currentEvent="UI Design" currentColor="#3083FF" nextEvent="CS50AI lecture" nextColor="#9975FF"/>
      </section>
    </div>
  )
}

export default IndexNewtab