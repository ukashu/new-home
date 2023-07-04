import "~base.css"
import "~style.css"

type Props = {
  author: string,
  quote: string,
}

function Quotes(props: Props) {

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-slate-200 gap-1 text-center justify-between">
      <p className="text-xs">{props.quote}</p>
      <h2 className="text-sm">{props.author}</h2>
    </div>
  )
}

export default Quotes