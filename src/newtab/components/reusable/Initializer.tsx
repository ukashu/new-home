import "~base.css"
import "~style.css"
import { Storage } from "@plasmohq/storage"
import React from 'react'
import PrettyText from "./PrettyText"

type Props = {
  name: string,
  initialize?: () => void
}

function Initializer(props: Props) {

  const storage = new Storage({
    area: "local"
  })

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col justify-center items-center rounded-lg">
      <button onClick={props.initialize} className="flex flex-row w-[50%] justify-center bg-zinc-800 items-center text-center"><PrettyText text={`Click to turn on ${props.name} widget`} color="#ffffff"/></button>
    </div>
  )
}

export default Initializer