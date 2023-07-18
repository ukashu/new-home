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

  const generateAndSetShortcuts = async () => {
    let rows = []
    const data = await storage.get("shortcuts")
    if (data) {
      for (let i in data as any) {
        rows.push(<Shortcut key={data[i]} websiteURL={data[i]} />)
      }
      setShortcuts(rows)
    }
  }

  return (
    <div className="mt-auto flex aspect-video max-h-[250px] min-h-[120px] w-full flex-row flex-wrap items-center justify-around gap-1 break-normal rounded-lg p-2 text-center text-slate-200">
      {shortcuts}
    </div>
  )
}
