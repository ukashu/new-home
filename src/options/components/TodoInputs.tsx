import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"

type Props = {
  type: string
}

export default function TodoInputs(props: Props) {
  const [todos, setTodos] = React.useState<any>()
  const [todoName, setTodoName] = React.useState<string>("")

  React.useEffect(() => {
    generateAndSetTodos()
  }, [])

  const storage = new Storage({
    area: "local"
  })

  const generateAndSetTodos = async () => {
    let rows = []
    const data = await storage.get(props.type)
    if (!data) {
      //intialize storage
      await storage.set(props.type, {})
    } else {
      for (let i in data as any) {
        rows.push(
          <div
            key={i}
            className="flex h-[30px] w-full flex-row items-center justify-between text-slate-200">
            <p>{i}</p>
            <button
              key={i}
              onClick={() => removeTodo(i, props.type)}
              className=" flex items-center justify-center bg-red-800 p-2">
              DELETE
            </button>
          </div>
        )
      }
      setTodos(rows)
    }
  }

  const addTodo = async (todoName, type, state) => {
    let data: any = await storage.get(type)
    if (!data) {
      return
    }
    if (todoName in data) {
      return "already_in_storage"
    }
    data[todoName] = state
    storage.set(type, data)
    setTodoName("")
    generateAndSetTodos()
  }

  const removeTodo = async (todoName, type) => {
    let data: any = await storage.get(type)
    if (!data) {
      return
    }
    if (todoName in data) {
      //delete
      delete data[todoName]
      await storage.set(type, data)
      generateAndSetTodos()
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 pt-20 text-slate-200">
      {todos}
      <label>
        Add {props.type} todo:{" "}
        <input
          name="newShortcut"
          maxLength={25}
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={(event) =>
            event.key === "Enter" && addTodo(todoName, props.type, false)
          }
          className=" text-black"></input>
      </label>
      <button onClick={() => addTodo(todoName, props.type, false)}>
        add todo
      </button>
    </div>
  )
}
