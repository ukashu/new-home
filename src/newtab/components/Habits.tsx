import "~base.css"
import "~style.css"

import Habit from "./Habit"
import HabitHeader from "./HabitHeader"
import React from "react"

export default function Habits() {
  const [columns, setColumns] = React.useState(columnCount())
  //TODO: function to get all habits from storage
  //generate components from data - pass in wideness prop

  //TODO: date header rendering
  // dynamically change widenessState variable and 

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

  function datesArray(columns) {
    let arr = []
    let today = Date.now()
    for (let i = 0; i < columns; i++) {
      arr.unshift(getDate(today))
      today = today - 1000*60*60*24
    }
    return arr
  }

  let dateArray = datesArray(columns)

  return (
    <div className="min-h-[200px] aspect-video w-full bg-black flex flex-row justify-center p-2 rounded-lg break-normal text-slate-200 text-center ">
      <div className="max-w-[800px] min-w-[400px] h-full flex flex-col text-slate-200 gap-1 text-center flex-grow overflow-hidden">
        <HabitHeader columns={dateArray}/>
        <Habit name="reading" columns={dateArray}/>
        <Habit name="jumping" columns={dateArray}/>
      </div>
    </div>
  )
}