import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import HabitManaged from "./HabitElement"

type Props = {
}

export default function HabitManager(props: Props) {
  const [habits, setHabits] = React.useState<any>()
  const [habitName, setHabitName] = React.useState<string>('')

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetHabits()
  }, [])

  const generateAndSetHabits = async() => {
    let rows = []
    const data = await storage.get('habits')
    if (!data) {
      //intialize storage
      await storage.set('habits', [])
    } else {
      for (let i in data as any) {
        rows.push(<HabitManaged name={data[i]} delete={() => removeHabit(data[i])} key={data[i]}/>)
      }
      setHabits(rows)
    }
  }

  const addHabit = async(habitName) => {
    let data: any = await storage.get('habits')
    if (!data) { return }
    if (data.indexOf(habitName) != -1) {
      return "already_in_storage"
    } else {
      data.push(habitName)
      await storage.set('habits', data)
      await storage.set(habitName, [])
      setHabitName('')
      generateAndSetHabits()
    }
  }

  const removeHabit = async(habitName) => {
    let data: any = await storage.get('habits')
    if (data.indexOf(habitName) != -1) {
      data.splice(data.indexOf(habitName), 1)
      await storage.set('habits', data)
      await storage.remove(habitName)
      generateAndSetHabits()
    } else {
      return "not_in_storage"
    }
  }

  return (
      <div className="flex flex-col w-full items-center justify-center gap-2 text-slate-200 pt-20">
        {habits}
        <label>
        Add habit: <input name="newHabit" value={habitName} onChange={e => setHabitName(e.target.value)} onKeyDown={event => (event.key === 'Enter') && addHabit(habitName)} className=" text-black"></input>
        </label>
        <button onClick={() => addHabit(habitName)}>add habit</button>
      </div>
  )
}