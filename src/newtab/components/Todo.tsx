import "~base.css"
import "~style.css"

import React from "react"
import Checkbox from "./utility/Checkbox"

export default function Todo(props) {
  const [state, setState] = React.useState<boolean>(props.completed)

  return (
    <div className="flex flex-row items-center bg-slate-700">
      <Checkbox state={state} onClick={() => {setState(prevState => !prevState)}}/>
      <p className="pl-1">{props.name}</p>
    </div>
  )
}