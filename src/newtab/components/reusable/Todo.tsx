import "~base.css"
import "~style.css"

import React from "react"
import Checkbox from "./Checkbox"

type Props = {
  name: string,
  completed: boolean,
  remove: (state: any) => Promise<void>
}

export default function Todo(props: Props) {
  const [state, setState] = React.useState<boolean>(props.completed)

  return (
    <div className="flex flex-row items-center bg-slate-700">
      <Checkbox state={state} onClick={() => {
        props.remove(!state)
        setState(prevState => !prevState)
      }}/>
      <p className="pl-1">{props.name}</p>
    </div>
  )
}