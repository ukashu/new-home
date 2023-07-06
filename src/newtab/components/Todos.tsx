import "~base.css"
import "~style.css"

import React from "react"
import Todo from "./Todo"
import { Storage } from "@plasmohq/storage"

function Todos() {
  const [todos, setTodos] = React.useState<any>()

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateTodos()
  }, [])

  const generateTodos = async() => {
    let rows = []
    const mode = await storage.get('mode')
    const data = await storage.get(mode)
    if (!data) {
      //intialize storage
      await storage.set(mode, 'WORK')
    } else {
      for (let i in data as any) {
        rows.push(
          <Todo name={data[i]} completed={false}/>
        )
      }
      setTodos(rows)
    }
  }

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-sm text-slate-200 gap-1 flex-grow">
      {todos}
    </div>
  )
}

export default Todos