import "~base.css"
import "~style.css"

import React from "react"
import Todo from "./reusable/Todo"
import { Storage } from "@plasmohq/storage"

function Todos() {
  const [todos, setTodos] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetTodos()
  }, [])

  const generateAndSetTodos = async () => {
    let rows = []
    const mode = await storage.get("mode")
    if (!mode) {
      await storage.set("mode", "WORK")
    }
    const data = await storage.get(mode)
    if (!data) {
      return
    }
    for (let i in data as any) {
      rows.push(
        <Todo
          key={i}
          name={i}
          completed={data[i]}
          remove={(state) => changeTodoState(i, mode, state)}
        />
      )
    }
    setTodos(rows)
  }

  const changeTodoState = async (name, type, state) => {
    let data: any = await storage.get(type)
    if (!data) {
      return
    }
    if (name in data) {
      data[name] = state
      storage.set(type, data)
    }
  }

  chrome.runtime.onMessage.addListener(async (message, sender, callback) => {
    if (message.action == "modeChange") {
      generateAndSetTodos()
    }
  })

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-grow flex-col gap-1 break-normal rounded-lg bg-black p-2 text-slate-200">
      {todos}
    </div>
  )
}

export default Todos
