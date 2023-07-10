import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import Shortcut from "./reusable/Shortcut"

export default function Shortcuts() {
  const [shortcuts, setShortcuts] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetShortcuts()
  }, [])

  const generateAndSetShortcuts = async() => {
    let rows = []
    const data = await storage.get('shortcuts')
    if (data) { 
      for (let i in data as any) {
        rows.push(<Shortcut key={data[i]} websiteURL={data[i]}/>)
      }
      setShortcuts(rows) 
    }
  }

  return (
    <div className="min-h-[120px] max-h-[250px] aspect-video w-full flex flex-row p-2 rounded-lg break-normal text-slate-200 gap-1 text-center justify-around items-center flex-wrap mt-auto">
      {shortcuts}
    </div>
  )
}