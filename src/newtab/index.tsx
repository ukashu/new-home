import "~base.css"
import "~style.css"

import newTabBackground from '../svg/newTabBackground.svg'
import { useState } from "react"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <div>
      <img src={newTabBackground} alt="newTabBackground" style={{
        'position': 'absolute',
        'zIndex': '-999',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%'
      }}/>
      <div className="flex flex-col h-screen w-100% ">
        <h1 >
          Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
        </h1>
        <input onChange={(e) => setData(e.target.value)} value={data} />
      </div>
    </div>
  )
}

export default IndexNewtab