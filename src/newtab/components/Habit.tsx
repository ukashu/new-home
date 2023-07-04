import "~base.css"
import "~style.css"

import Tick from "./utility/Tick"
import Icons from "./utility/Icons"
import React from "react"
import { Storage } from "@plasmohq/storage"

type Props = {
  name: string,
  completed: boolean,
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

  //getSavedInStorage
  const readHabitData = async() => {
    let data = await storage.get(props.name)
    return data
  }

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
      <div className="flex flex-row h-2.5em w-full items-center justify-around">
        <Icons/>
        {/* <button className="w-20 h-20 bg-red-600" onClick={() => {generateTics()}}></button> */}
        {ticks}
      </div>
  )
}