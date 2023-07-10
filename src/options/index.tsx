import "~base.css"
import "~style.css"

import newTabBackground from '../resources/newTabBackground.svg'
import HabitManager from "./components/HabitInput"
import ShortcutInput from "./components/ShortcutInput"
import TodoInputs from "./components/TodoInput"

function OptionsIndex() {

  return (
    <div className="flex flex-row justify-between h-screen p-2 gap-2 font-[Inter]">
      <img src={newTabBackground} alt="newTabBackground" style={{
        'position': 'absolute',
        'zIndex': '-999',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%'
      }}/>
      <section id="left" className="flex flex-col items-center w-1/5 min-w-[300px] h-100% gap-2">
        <h2>LEFT</h2>
      </section>
      <section id="center" className="flex flex-col items-center w-3/5 min-w-[400px] h-100% gap-2 p-20">
        <div className=" flex flex-row">
          <HabitManager/>
          <ShortcutInput/>
        </div>
        <div className=" flex flex-row">
          <TodoInputs type="WORK"/>
          <TodoInputs type="LIFE"/>
        </div>
      </section>
      <section id="right" className="flex flex-col items-center justify-between w-1/5 min-w-[300px] h-100% gap-2">
        <h2>RIGHT</h2>
      </section>
    </div>
  )
}

export default OptionsIndex