import "~base.css"
import "~style.css"

import Tick from "./Tick"
import Icons from "./Icons"
import Tooltip from "../../../utility/Tooltip"
import React from "react"
import { Storage } from "@plasmohq/storage"

type Props = {
  name: string,
  columns: Array<string>
}

export default function Habit(props: Props) {
  const [ticks, setTicks] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetTicks()
  }, [])

  const generateAndSetTicks = async() => {
    let rows = []
    const data = await storage.get(props.name)
    if (!data) {
      for (let i in props.columns) {
        rows.push(<Tick state={false} name={props.name} date={props.columns[i]} key={props.name+props.columns[i]} />)
      }
      return setTicks(rows)
    }
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