import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import IconSelection from "./IconSelection"
import Icons from "~newtab/components/reusable/Icons"

type Props = {
}

export default function HabitInputs(props: Props) {
  const [habits, setHabits] = React.useState<any>()
  const [habitName, setHabitName] = React.useState<string>('')
  const [iconsModalShown, setIconsModalShown] = React.useState(false)
  const [icon, setIcon] = React.useState('')

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
        rows.push(
          <div key={data[i]} className="h-[30px] w-full text-slate-200 flex flex-row justify-between items-center">
            <p>{data[i]}</p>
            <button onClick={() => removeHabit(data[i])} className=" bg-red-800 p-2 flex items-center justify-center">DELETE</button>
          </div>
        )
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
      <div className="flex flex-col w-full items-center justify-center p-2 gap-2 text-slate-200 pt-20">
        {habits}
        <label>
        Add habit: <input name="newHabit" maxLength={25} value={habitName} onChange={e => setHabitName(e.target.value)} onKeyDown={event => (event.key === 'Enter') && addHabit(habitName)} className=" text-black"></input>
        </label>
        <div className=" flex flex-row items-center h-[30px] gap-1">
          {iconsModalShown ? 
          <IconSelection setIcon={(iconName) => setIcon(iconName)} hideModal={() => setIconsModalShown(false)}/> :
          <div onClick={() => {setIconsModalShown(prevState => !prevState)}} className=" bg-zinc-200 p-1 rounded-sm hover:cursor-pointer">
            <Icons icon={icon as any}/>
          </div>
          }
          <button onClick={() => addHabit(habitName)}>add habit</button>
        </div> 
      </div>
  )
}