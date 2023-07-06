import "~base.css"
import "~style.css"

import React from "react"

type Props = {
  columns: Array<string>
}

export default function HabitHeader(props: Props) {

  //TODO: Generate Ticks based on data passed
  //change number of rendered Ticks based on wideness prop

  //function to modify storage data on Tick Click

  const generateDays = () => {
    let rows = []
    for (let i in props.columns) {
      rows.push(<div key={props.columns[i]} className="h-[calc(100%-4px)] m-1 aspect-square flex justify-center text-[9px] text-zinc-400"><p>{`${props.columns[i][4]+props.columns[i][5]+'/'+props.columns[i][6]+props.columns[i][7]}`}</p></div>)
    } 
    return rows
  }

  return (
      <div className="flex flex-row h-[3em] w-full items-center justify-center gap-2">
        <div className="h-[calc(100%)] aspect-square flex justify-center text-[9px] text-zinc-400 "><p></p></div>
        {generateDays()}
      </div>
  )
}