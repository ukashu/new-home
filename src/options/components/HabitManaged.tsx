import "~base.css"
import "~style.css"

export default function HabitManaged(props) {
  return (
    <div className="h-[30px] text-slate-200">
      <p>{props.name}</p>
    </div>
  )
}