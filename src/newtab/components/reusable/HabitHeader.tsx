import "~base.css"
import "~style.css"

import React from "react"

type Props = {
  columns: Array<string>
}

export default function HabitHeader(props: Props) {

  const generateDayHeaders = () => {
    let rows = []
    for (let i in props.columns) {
      rows.push(<div key={props.columns[i]} className="h-[2em] m-1 flex justify-center text-[9px] text-zinc-400"><p>{`${props.columns[i][4]+props.columns[i][5]+'/'+props.columns[i][6]+props.columns[i][7]}`}</p></div>)
    } 
    return rows
  }

  return (
      <div className="flex flex-row h-[3em] w-full items-center justify-center gap-2 ">
        <div className="w-[3em] aspect-square rounded-sm flex items-center justify-center"></div>
        {generateDayHeaders()}
      </div>
  )
}