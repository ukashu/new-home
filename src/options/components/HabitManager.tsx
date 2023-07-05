import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import HabitManaged from "./HabitManaged"

type Props = {
}

export default function HabitManager(props: Props) {
  const [habits, setHabits] = React.useState<any>()
  const [habitName, setHabitName] = React.useState<string>('')

  React.useEffect(() => {
    generateHabits()
  }, [])

  const storage = new Storage({
    area: "local"
  })

  const generateHabits = async() => {
    let rows = []
    const data = await storage.get('habits')
    if (!data) {
      //intialize storage
      await storage.set('habits', [])
    } else {
      for (let i in data as any) {
        rows.push(<HabitManaged name={data[i]} delete={() => removeHabit(data[i])}/>)
      }
      setHabits(rows)
    }
  }

  const addHabit = async(habitName) => {
    let data: any = await storage.get('habits')
    if (data.indexOf(habitName) != -1) {
      return "already_in_storage"
    } else {
      if (!data) {/*initialize*/ await storage.set('habits', []) }
      data.push(habitName)
      storage.set('habits', data)
      generateHabits()
    }
  }

  const removeHabit = async(habitName) => {
    let data: any = await storage.get('habits')
    if (data.indexOf(habitName) != -1) {
      //delete
      data.splice(data.indexOf(habitName), 1)
      await storage.set('habits', data)
      generateHabits()
    } else {
      //no habit with that name
      return
    }
  }

  return (
      <div className="flex flex-col h-[3em] w-full items-center justify-center gap-2 text-slate-200 pt-20">
        {habits}
        <label>
        Add habit: <input name="newHabit" value={habitName} onChange={e => setHabitName(e.target.value)} onKeyDown={event => (event.key === 'Enter') && addHabit(habitName)} className=" text-black"></input>
        </label>
        <button onClick={() => addHabit(habitName)}>add habit</button>
      </div>
  )
}