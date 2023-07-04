import "~base.css"
import "~style.css"

import Todo from "./Todo"

function Todos() {

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-sm text-slate-200 gap-1 flex-grow">
      <Todo name="Task 1" completed={false}/>
      <Todo name="Task 2" completed={true}/>
    </div>
  )
}

export default Todos