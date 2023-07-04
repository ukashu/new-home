import "~base.css"
import "~style.css"

type Props = {
  currentEvent: string,
  currentColor: string,
  nextEvent: string,
  nextColor: string
}

function Events(props: Props) {

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal font-bold text-base">
      <div>
        <p style={{
        "background": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${props.currentColor} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Current event:
        </p>
        <p style={{
        "background": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${props.currentColor} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>{props.currentEvent}
        </p>
      </div>
      <div>
        <p style={{
        "background": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${props.nextColor} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Next event:
        </p>
        <p style={{
        "background": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${props.nextColor} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>{props.nextEvent}
        </p>
      </div>
    </div>
  )
}

export default Events