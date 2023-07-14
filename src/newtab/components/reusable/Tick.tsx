import { Storage } from "@plasmohq/storage"
import React from "react"

export default function Tick(props: { state: boolean, date: string, name: string }) {
  const [completed, setCompleted] = React.useState<boolean>(props.state)

  const storage = new Storage({
    area: "local"
  })

  const changeTickState = async() => {
    let data: any = await storage.get(props.name)
    if (data[data.indexOf(props.date)]) {
      data.splice(data.indexOf(props.date), 1)
      await storage.set(props.name, data)
    } else {
      data.push(props.date)
      //sort data
      data.sort()
      await storage.set(props.name, data)
    }
    setCompleted(prevState => !prevState)
  }

  return (
    completed ?
    
    <div className="h-[2em] m-1 aspect-square flex justify-center" onClick={() => changeTickState()}>
      <svg viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.87498 10.175L2.19998 6.49999L0.974976 7.72499L5.87498 12.625L16.375 2.12499L15.15 0.899994L5.87498 10.175Z" fill="white"/>
      </svg>
    </div>
    :
    <div className="h-[2em] m-1 aspect-square flex justify-center" onClick={() => changeTickState()}>
      <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.625 1.60875L11.3913 0.375L6.5 5.26625L1.60875 0.375L0.375 1.60875L5.26625 6.5L0.375 11.3913L1.60875 12.625L6.5 7.73375L11.3913 12.625L12.625 11.3913L7.73375 6.5L12.625 1.60875Z" fill="#606060"/>
      </svg>
    </div>
  )
}