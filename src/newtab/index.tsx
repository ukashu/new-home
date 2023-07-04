import "~base.css"
import "~style.css"
import Spotify from "./components/Spotify"

import newTabBackground from '../resources/newTabBackground.svg'
import { useState } from "react"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-row justify-between h-screen">
      <img src={newTabBackground} alt="newTabBackground" style={{
        'position': 'absolute',
        'zIndex': '-999',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%'
      }}/>
      <section id="left" className="flex flex-col items-center w-1/5 h-100% bg-red-200">
        <h1>LEFT</h1>
      </section>
      <section id="center" className="flex flex-col items-center w-3/5 h-100% bg-red-300">
        <h1>CENTER</h1>
      </section>
      <section id="right" className="flex flex-col items-center w-1/5 h-100% bg-red-400">
        <h1>RIGHT</h1>
        <Spotify/>
      </section>
    </div>
  )
}

export default IndexNewtab