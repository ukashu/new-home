import "~base.css"
import "~style.css"

import Habit from "./Habit"
import HabitHeader from "./HabitHeader"
import React from "react"
import { Storage } from "@plasmohq/storage"

export default function Habits() {
  const [columns, setColumns] = React.useState(columnCount())
  const [habits, setHabits] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateHabits()
  }, ['columns'])

  function columnCount() {
    const screen = window.screen.width
    const current = window.innerWidth
    const number = Math.floor((current/screen)*14)
    return number
  }

  function getDate(date) {
    let parsedDate: any = new Date(date)
    parsedDate = parsedDate.toISOString().split('T')[0]
    parsedDate = parsedDate.split('-')
    parsedDate = parsedDate[0]+parsedDate[1]+parsedDate[2] 
    return parsedDate
  }

  function datesArray(columns, date) {
    let arr = []
    let today = date
    for (let i = 0; i < columns; i++) {
      arr.unshift(getDate(today))
      today = today - 1000*60*60*24
    }
    return arr
  }

  const generateHabits = async() => {
    let rows = []
    const data = await storage.get('habits')
    if (!data) {
      //intialize storage
      await storage.set('habits', [])
    } else {
      for (let i in data as any) {
        rows.push(<Habit name={data[i]} columns={dateArray} key={data[i]}/>)
      }
      setHabits(rows)
    }
  }

  let dateArray = datesArray(columns, Date.now())

  return (
    <div className="min-h-[200px] aspect-video w-full bg-black flex flex-row justify-center p-2 rounded-lg break-normal text-slate-200 text-center ">
      <div className="max-w-[800px] min-w-[400px] h-full flex flex-col text-slate-200 gap-1 text-center flex-grow overflow-hidden">
        <HabitHeader columns={dateArray}/>
        {habits}
      </div>
    </div>
  )
}