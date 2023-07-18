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
      rows.push(
        <div
          key={props.columns[i]}
          className="m-1 flex h-[2em] justify-center text-[9px] text-zinc-400">
          <p>{`${
            props.columns[i][4] +
            props.columns[i][5] +
            "/" +
            props.columns[i][6] +
            props.columns[i][7]
          }`}</p>
        </div>
      )
    }
    return rows
  }

  return (
    <div className="flex h-[3em] w-full flex-row items-center justify-center gap-2 ">
      <div className="flex aspect-square w-[3em] items-center justify-center rounded-sm"></div>
      {generateDayHeaders()}
    </div>
  )
}
