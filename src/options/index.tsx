import "~base.css"
import "~style.css"

import HabitInputs from "./components/HabitInputs"
import ShortcutInputs from "./components/ShortcutInputs"
import TodoInputs from "./components/TodoInputs"

function OptionsIndex() {

  return (
    <div className="flex flex-row justify-between h-screen p-2 gap-2 font-[Inter]">
      <div className=" flex flex-row gap-10">
        <HabitInputs/>
        <ShortcutInputs/>
      </div>
      <div className=" flex flex-row gap-10">
        <TodoInputs type="WORK"/>
        <TodoInputs type="LIFE"/>
        </div>
    </div>
  )
}

export default OptionsIndex