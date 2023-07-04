import "~base.css"
import "~style.css"

import Habit from "./Habit"

export default function Habits() {
  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-slate-200 gap-1 text-center ">
      <h2>HABITS</h2>
      <Habit name="reading" completed={false}/>
      <Habit name="reading" completed={true}/>
      <Habit name="reading" completed={false}/>
      <Habit name="reading" completed={true}/>
    </div>
  )
}