import "~base.css"
import "~style.css"

import { AiFillBook } from 'react-icons/ai'
import Tick from "./utility/Tick"
import React from "react"

type Props = {
  name: string,
  completed: boolean
}

export default function Habit(props: Props) {
  const [state, setState] = React.useState(props.completed)

  return (
      <div className="flex flex-row h-2.5em">
        <AiFillBook size="2.5em"/>
        <Tick state={state} onClick={() => setState(prevState => !prevState)}/>
      </div>
  )
}