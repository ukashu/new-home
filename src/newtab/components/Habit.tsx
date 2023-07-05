import "~base.css"
import "~style.css"

import Tick from "./utility/Tick"
import Icons from "./utility/Icons"
import Tooltip from "./utility/Tooltip"
import React from "react"
import { Storage } from "@plasmohq/storage"

type Props = {
  name: string,
  columns: Array<string>
}

export default function Habit(props: Props) {
  const [ticks, setTicks] = React.useState<any>()

  React.useEffect(() => {
    generateTics()
  }, [])

  //TODO: Generate Ticks based on data passed
  //change number of rendered Ticks based on wideness prop

  //function to modify storage data on Tick Click
  const storage = new Storage({
    area: "local"
  })

  const initStorage = async() => {
    await storage.set(props.name, [])
  }

  const generateTics = async() => {
    const data = await storage.get(props.name)
    console.log({data: data})
    let rows = []
    if (!data) {
      //TODO: move initialization to options - when you create new habit 
      console.log("initializing")
      initStorage()
      for (let i in props.columns) {
        rows.push(<Tick state={false} name={props.name} date={props.columns[i]} key={props.name+props.columns[i]} />)
      }
      return setTicks(rows)
    }
    console.log("generating")
    for (let i in props.columns) {
      if (data[data.indexOf(props.columns[i])]) {
        rows.push(<Tick state={true} name={props.name} date={props.columns[i]} key={props.name+props.columns[i]} />)
      } else {
        rows.push(<Tick state={false} name={props.name} date={props.columns[i]} key={props.name+props.columns[i]} />)
      }
    }
    return setTicks(rows)
  }
  
  return (
      <div className="flex flex-row h-[3em] w-full items-center justify-center gap-2">
        <Tooltip message={props.name}>
          <Icons/>
        </Tooltip>
        {ticks}
      </div>
  )
}