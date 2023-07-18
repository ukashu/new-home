import "~base.css"
import "~style.css"
import { Storage } from "@plasmohq/storage"
import React from "react"
import PrettyText from "./PrettyText"

type Props = {
  name: string
  initialize?: () => void
}

function Initializer(props: Props) {
  const storage = new Storage({
    area: "local"
  })

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-col items-center justify-center rounded-lg bg-black">
      <button
        onClick={props.initialize}
        className="flex w-[50%] flex-row items-center justify-center bg-zinc-800 text-center">
        <PrettyText
          text={`Click to turn on ${props.name} widget`}
          color="#ffffff"
        />
      </button>
    </div>
  )
}

export default Initializer
