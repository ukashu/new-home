import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import ShortcutElement from "~options/components/ShortcutElement"
import Tooltip from "./utility/Tooltip"

export default function Shortcuts() {
  const [shortcuts, setShortcuts] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateShortcuts()
  }, [])

  const generateShortcuts = async() => {
    let rows = []
    const data = await storage.get('shortcuts')
    if (!data) {
      //intialize storage
      await storage.set('shortcuts', [])
    } else {
      for (let i in data as any) {
        rows.push(
        //move to separate component
        <Tooltip key={data[i]} message={data[i]}>
          <div onClick={() => window.open(data[i], '_self')} onMouseDown={e => (e.button === 1) && window.open(data[i])} className="h-[80px] aspect-square text-slate-200 bg-black flex items-center justify-center rounded-lg cursor-pointer">
          <img src={faviconURL(data[i])}/>
          </div>
        </Tooltip>
        )
      }
      setShortcuts(rows)
    }
  }

  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "30");
    return url.toString();
  }

  return (
    <div className="min-h-[120px] max-h-[250px] aspect-video w-full flex flex-row p-2 rounded-lg break-normal text-slate-200 gap-1 text-center justify-around items-center flex-wrap mt-auto">
      {shortcuts}
    </div>
  )
}