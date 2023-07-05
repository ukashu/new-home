import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import ShortcutElement from "./ShortcutElement"

type Props = {
}

export default function ShortcutInput(props: Props) {
  const [shortcuts, setShortcuts] = React.useState<any>()
  const [shortcutName, setShortcutName] = React.useState<string>('')

  React.useEffect(() => {
    generateShortcuts()
  }, [])

  const storage = new Storage({
    area: "local"
  })

  const generateShortcuts = async() => {
    let rows = []
    const data = await storage.get('shortcuts')
    if (!data) {
      //intialize storage
      await storage.set('shortcuts', [])
    } else {
      for (let i in data as any) {
        rows.push(<ShortcutElement name={data[i]} delete={() => removeShortcut(data[i])} key={data[i]}/>)
      }
      setShortcuts(rows)
    }
  }

  const addShortcut = async(shortcutName) => {
    let data: any = await storage.get('shortcuts')
    if (data.indexOf(shortcutName) != -1) {
      return "already_in_storage"
    } else {
      if (!data) {/*initialize*/ await storage.set('shortcuts', []) }
      data.push(shortcutName)
      storage.set('shortcuts', data)
      generateShortcuts()
    }
  }

  const removeShortcut = async(shortcutName) => {
    let data: any = await storage.get('shortcuts')
    if (data.indexOf(shortcutName) != -1) {
      //delete
      data.splice(data.indexOf(shortcutName), 1)
      await storage.set('shortcuts', data)
      generateShortcuts()
    } else {
      //no habit with that name
      return
    }
  }

  return (
      <div className="flex flex-col w-full items-center justify-center gap-2 text-slate-200 pt-20">
        {shortcuts}
        <label>
        Add shortcut: <input name="newShortcut" value={shortcutName} onChange={e => setShortcutName(e.target.value)} onKeyDown={event => (event.key === 'Enter') && addShortcut(shortcutName)} className=" text-black"></input>
        </label>
        <button onClick={() => addShortcut(shortcutName)}>add shortcut</button>
      </div>
  )
}