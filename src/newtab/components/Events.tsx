import "~base.css"
import "~style.css"

function Events() {

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal font-bold text-base">
      <div>
        <p style={{
        "background": "radial-gradient(51.14% 51.14% at 50.23% 62.5%, rgb(3, 155, 229) 0%, #8d8d8d 100%)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Current event:
        </p>
        <p style={{
        "background": "radial-gradient(51.14% 51.14% at 50.23% 62.5%, rgb(3, 155, 229) 0%, #8d8d8d 100%)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>Coding time
        </p>
      </div>
      <div>
        <p style={{
        "background": "radial-gradient(51.14% 51.14% at 50.23% 62.5%, rgb(3, 155, 229) 0%, #8d8d8d 100%)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Next event:
        </p>
        <p style={{
        "background": "radial-gradient(51.14% 51.14% at 50.23% 62.5%, rgb(3, 155, 229) 0%, #8d8d8d 100%)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>UI Design
        </p>
      </div>
    </div>
  )
}

export default Events