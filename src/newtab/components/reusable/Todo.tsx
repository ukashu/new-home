import "~base.css"
import "~style.css"

import React from "react"
import Checkbox from "./Checkbox"
import PrettyText from "./PrettyText"

type Props = {
  name: string,
  completed: boolean,
  remove: (state: any) => Promise<void>
}

export default function Todo(props: Props) {
  const [state, setState] = React.useState<boolean>(props.completed)

  return (
    <div className="flex flex-row items-center">
      <Checkbox state={state} onClick={() => {
        props.remove(!state)
        setState(prevState => !prevState)
      }}/>
      <div className="pl-1 font-bold"><PrettyText text={props.name} color='#FFFFFF'/></div>
    </div>
  )
}