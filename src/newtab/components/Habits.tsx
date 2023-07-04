import "~base.css"
import "~style.css"

import Habit from "./Habit"

export default function Habits() {
  //TODO: function to get all habits from storage
  //generate components from data - pass in wideness prop

  //TODO: date header rendering
  // dynamically change widenessState variable and 

  return (
    <div className="min-h-[200px] aspect-video w-full bg-black flex flex-row justify-center p-2 rounded-lg break-normal text-slate-200 text-center ">
      <div className="max-w-[600px] w-auto min-w-[400px] h-full flex flex-col text-slate-200 gap-1 text-center bg-red-200 flex-grow overflow-hidden">
        <Habit name="reading" completed={false}/>
        <Habit name="reading" completed={true}/>
        <Habit name="reading" completed={false}/>
        <Habit name="reading" completed={true}/>
      </div>
    </div>
  )
}