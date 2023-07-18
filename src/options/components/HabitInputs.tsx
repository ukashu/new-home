import "~base.css"
import "~style.css"

import React from "react"
import { Storage } from "@plasmohq/storage"
import IconSelection from "./IconSelection"
import Icons from "~newtab/components/reusable/Icons"

type Props = {}

export default function HabitInputs(props: Props) {
  const [habits, setHabits] = React.useState<any>()
  const [habitName, setHabitName] = React.useState<string>("")
  const [iconsModalShown, setIconsModalShown] = React.useState(false)
  const [icon, setIcon] = React.useState("")

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateAndSetHabits()
  }, [])

  const generateAndSetHabits = async () => {
    let rows = []
    const data = await storage.get("habits")
    if (!data) {
      //intialize storage
      await storage.set("habits", {})
    } else {
      for (let i in data as any) {
        rows.push(
          <div
            key={i}
            className="flex h-[30px] w-full flex-row items-center gap-1 text-slate-200">
            <div className=" rounded-sm bg-zinc-200 p-1">
              <Icons icon={data[i]} />
            </div>
            <p>{i}</p>
            <button
              onClick={() => removeHabit(i)}
              className=" ml-auto flex items-center justify-center bg-red-800 p-2">
              DELETE
            </button>
          </div>
        )
      }
      setHabits(rows)
    }
  }

  const addHabit = async (habitName, icon) => {
    let data: any = await storage.get("habits")
    if (!data) {
      return
    }
    if (habitName in data) {
      return "already_in_storage"
    }
    const newData = {
      ...data,
      [habitName]: icon
    }
    await storage.set("habits", newData)
    await storage.set(habitName, [])
    setHabitName("")
    generateAndSetHabits()
  }

  const removeHabit = async (habitName) => {
    let data: any = await storage.get("habits")
    if (habitName in data) {
      delete data[habitName]
      await storage.set("habits", data)
      await storage.remove(habitName)
      generateAndSetHabits()
    } else {
      return "not_in_storage"
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-2 pt-20 text-slate-200">
      {habits}
      <label>
        Add habit:{" "}
        <input
          name="newHabit"
          maxLength={25}
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          onKeyDown={(event) =>
            event.key === "Enter" && addHabit(habitName, icon)
          }
          className=" text-black"></input>
      </label>
      <div className=" flex h-[30px] flex-row items-center gap-1">
        {iconsModalShown ? (
          <IconSelection
            setIcon={(iconName) => setIcon(iconName)}
            hideModal={() => setIconsModalShown(false)}
          />
        ) : (
          <div
            onClick={() => {
              setIconsModalShown((prevState) => !prevState)
            }}
            className=" rounded-sm bg-zinc-200 p-1 hover:cursor-pointer">
            <Icons icon={icon as any} />
          </div>
        )}
        <button onClick={() => addHabit(habitName, icon)}>add habit</button>
      </div>
    </div>
  )
}
