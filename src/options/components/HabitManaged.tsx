import "~base.css"
import "~style.css"

export default function HabitManaged(props) {
  return (
    <div className="h-[30px] text-slate-200 flex flex-row">
      <p>{props.name}</p>
      <button onClick={props.delete} className=" bg-red-800 p-2 flex items-center justify-center">DELETE</button>
    </div>
  )
}