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
    generateTodos()
  }, [])

  const generateTodos = async() => {
    let rows = []
    const mode = await storage.get('mode')
    if (!mode) {
      await storage.set('mode', 'WORK')
      return
    }
    const data = await storage.get(mode)
    if (!data) {
      //intialize storage
      return
    } else {
      for (let i in data as any) {
        rows.push(
          <Todo key={i} name={i} completed={data[i]} remove={(state) => changeTodoState(i, mode, state)}/>
        )
      }
      setTodos(rows)
    }
  }

  const changeTodoState = async(name, type, state) => {
    let data: any = await storage.get(type)
    if (name in data) {
      data[name] = state
      storage.set(type, data)
    } else {
      if (!data) {/*initialize*/ 
      await storage.set(type, {})
      }
    }
  }

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-sm text-slate-200 gap-1 flex-grow">
      {todos}
    </div>
  )
}

export default Todos