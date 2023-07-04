import "~base.css"
import "~style.css"

function Spotify() {

  return (
    <div className="min-h-[150px] aspect-video w-full bg-blue-200 flex flex-col p-2 rounded-lg">
      <div className="h-2/3 bg-blue-300 flex flex-row justify-between">
        <div className="h-full bg-blue-600 aspect-square"></div>
        <div className="h-full w-full bg-green-300 "></div>
      </div>
      <div className="h-1/3 bg-blue-400 justify-center text-center text-sm">
        <h3 className="m-0 drop-shadow truncate max-w-full">No device is connected</h3>
        <p className="m-0 drop-shadow truncate max-w-full">Great track</p>
      </div>
    </div>
  )
}

export default Spotify