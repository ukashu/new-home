
import "~base.css"
import "~style.css"
import React from 'react'
import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const [mode, setMode] = React.useState('')

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    readAndSetModeFromStorage()
  }, [])

  const setModeStorage = async(mode) => {
    await storage.set('mode', mode)
    setMode(mode)
    chrome.runtime.sendMessage({action: 'modeChange'})
  }

  const readAndSetModeFromStorage = async() => {
    const savedMode = await storage.get('mode')
    if (!savedMode) {
      await storage.set('mode', 'LIFE')
      setMode('LIFE')
      return
    }
    setMode(savedMode)
  }

  return (
    <div className="flex items-center justify-center h-16 w-40">
      <button 
      className={mode === "WORK" ? "flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105 bg-red-400" : "flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105"}
      onClick={() => setModeStorage('WORK')}>
        WORK
      </button>
      <button 
      className={mode === "LIFE" ? "flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105 bg-red-400" : "flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105"}
      onClick={() => setModeStorage('LIFE')}>
        LIFE
      </button>
    </div>
  )
}

export default IndexPopup
