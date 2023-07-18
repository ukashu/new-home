import "~base.css"
import "~style.css"

import Habit from "./reusable/Habit"
import HabitHeader from "./reusable/HabitHeader"
import React from "react"
import { Storage } from "@plasmohq/storage"
import { createDatesArray } from "../../utility/utility"

export default function Habits() {
  const [columns, setColumns] = React.useState(columnCount())
  const [habits, setHabits] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetHabits()
  }, ["columns"])

  function columnCount() {
    const screen = window.screen.width
    const current = window.innerWidth
    const number = Math.floor((current / screen) * 20)
    return number
  }

  const generateAndSetHabits = async () => {
    let rows = []
    const data = await storage.get("habits")
    if (data) {
      for (let i in data as any) {
        rows.push(<Habit name={i} columns={dateArray} key={i} icon={data[i]} />)
      }
      setHabits(rows)
    }
  }

  let dateArray = createDatesArray(columns, Date.now())

  return (
    <div className="flex aspect-video min-h-[200px] w-full flex-row justify-center break-normal rounded-lg bg-black text-center text-slate-200">
      <div className="flex h-full min-w-[400px] max-w-[1000px] flex-grow flex-col gap-1 overflow-y-auto p-2 text-center text-slate-200">
        <HabitHeader columns={dateArray} />
        {habits}
      </div>
    </div>
  )
}
