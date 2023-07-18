import "~base.css"
import "~style.css"

import HabitInputs from "./components/HabitInputs"
import ShortcutInputs from "./components/ShortcutInputs"
import TodoInputs from "./components/TodoInputs"

function OptionsIndex() {

  return (
    <div className="flex flex-row justify-around h-screen m-10 gap-10 font-[Inter]">
        <HabitInputs/>
        <ShortcutInputs/>
        <TodoInputs type="WORK"/>
        <TodoInputs type="LIFE"/>
    </div>
  )
}

export default OptionsIndex