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

  //TODO: Generate Ticks based on data passed
  //change number of rendered Ticks based on wideness prop

  //function to modify storage data on Tick Click

  return (
      <div className="flex flex-row h-2.5em w-full items-center justify-around">
        <Icons/>
        <Tick state={state} onClick={() => setState(prevState => !prevState)}/>
      </div>
  )
}