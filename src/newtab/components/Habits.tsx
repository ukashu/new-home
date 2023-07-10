import "~base.css"
import "~style.css"

import Habit from "./reusable/Habit"
import HabitHeader from "./reusable/HabitHeader"
import React from "react"
import { Storage } from "@plasmohq/storage"
import { createDatesArray } from '../../utility/utility'

export default function Habits() {
  const [columns, setColumns] = React.useState(columnCount())
  const [habits, setHabits] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetHabits()
  }, ['columns'])

  function columnCount() {
    const screen = window.screen.width
    const current = window.innerWidth
    const number = Math.floor((current/screen)*14)
    return number
  }

  const generateAndSetHabits = async() => {
    let rows = []
    const data = await storage.get('habits')
    if (data) {
      for (let i in data as any) {
        rows.push(<Habit name={data[i]} columns={dateArray} key={data[i]}/>)
      }
      setHabits(rows)
    }
  }

  let dateArray = createDatesArray(columns, Date.now())

  return (
    <div className="min-h-[200px] aspect-video w-full bg-black flex flex-row justify-center p-2 rounded-lg break-normal text-slate-200 text-center ">
      <div className="max-w-[800px] min-w-[400px] h-full flex flex-col text-slate-200 gap-1 text-center flex-grow overflow-hidden">
        <HabitHeader columns={dateArray}/>
        {habits}
      </div>
    </div>
  )
}