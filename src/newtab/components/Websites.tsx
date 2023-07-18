import "~base.css"
import "~style.css"

import React from "react"

import { Storage } from "@plasmohq/storage"

import PrettyText from "./reusable/PrettyText"

export default function Websites() {
  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    generateDomains()
  }, [])

  const [domains, setDomains] = React.useState<any>()

  const generateDomains = async () => {
    let rows = []
    const data = await storage.get("domainStorage")
    const total: any = await storage.get("totalDomainStorage")
    if (data && total) {
      //sort data
      let entries = Object.entries(data)
      let sorted = entries.sort((a: any, b: any) => b[1] - a[1])
      //generate components
      for (let i in sorted as any) {
        if (sorted[i][0] === "date") {
          continue
        }
        let percentage = Math.floor((Number(sorted[i][1]) / total) * 100)
        rows.push(
          <div
            key={sorted[i][0]}
            className=" flex flex-row items-center justify-between text-white">
            <div className="w-3/12 flex-grow text-left font-bold">
              <PrettyText color="#FFFFFF" text={sorted[i][0]} />
            </div>
            <div className="mx-1 flex h-full w-6/12 flex-grow items-center justify-start">
              <div
                className={`h-[3px] rounded-md bg-zinc-600`}
                style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="w-3/12 flex-grow text-right font-bold">
              <PrettyText
                color="#FFFFFF"
                text={`${sorted[i][1]}min / ${percentage}%`}
              />
            </div>
          </div>
        )
      }
    }
    setDomains(rows)
  }

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-col gap-1 overflow-y-auto break-normal rounded-lg bg-black px-5 py-3 text-center text-slate-200">
      {domains}
    </div>
  )
}
