import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import HabitManaged from "./HabitManaged"

type Props = {
}

export default function HabitManager(props: Props) {
  const [habits, setHabits] = React.useState<any>()

  React.useEffect(() => {
    generateHabits()
  }, [])

  const storage = new Storage({
    area: "local"
  })

  const initStorage = async() => {
    await storage.set('habits', [])
  }

  const generateHabits = async() => {
    let rows = []
    const data = await storage.get('habits')
    console.log({data})
    if (!data) {
      initStorage()
    } else {
      for (let i in data as any) {
        rows.push(<HabitManaged name={data[i]}/>)
      }
      setHabits(rows)
    }
  }

  const addHabit = async(habitName) => {
    let data: any = await storage.get('habits')
    if (!data) {
      return
    } else if (data[data.indexOf(habitName)]) {
      return
    } else {
      console.log({dataType: data})
      data.push(habitName)
      storage.set('habits', data)
    }
  }

  return (
      <div className="flex flex-col h-[3em] w-full items-center justify-center gap-2">
        {habits}
        <button onClick={() => addHabit('nazwa2')}>add habit</button>
      </div>
  )
}