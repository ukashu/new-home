import "~base.css"
import "~style.css"

import Tick from "./utility/Tick"
import Icons from "./utility/Icons"
import React from "react"

type Props = {
  name: string,
  completed: boolean
}

export default function Habit(props: Props) {
  const [state, setState] = React.useState(props.completed)

  return (
      <div className="flex flex-row h-2.5em items-center">
        <Icons/>
        <Tick state={state} onClick={() => setState(prevState => !prevState)}/>
      </div>
  )
}