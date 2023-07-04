import "~base.css"
import "~style.css"

import Habit from "./Habit"
import HabitHeader from "./HabitHeader"

export default function Habits() {
  //TODO: function to get all habits from storage
  //generate components from data - pass in wideness prop

  //TODO: date header rendering
  // dynamically change widenessState variable and 

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

  let dateArray = datesArray(6)

  console.log({dateArray})

  return (
    <div className="min-h-[200px] aspect-video w-full bg-black flex flex-row justify-center p-2 rounded-lg break-normal text-slate-200 text-center ">
      <div className="max-w-[600px] w-auto min-w-[400px] h-full flex flex-col text-slate-200 gap-1 text-center flex-grow overflow-hidden">
        <HabitHeader columns={dateArray}/>
        <Habit name="reading" completed={false} columns={dateArray}/>
      </div>
    </div>
  )
}