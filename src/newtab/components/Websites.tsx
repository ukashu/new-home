import "~base.css"
import "~style.css"
import React from "react"
import { Storage } from "@plasmohq/storage"

export default function Websites() {
  const storage = new Storage({
    area: "local"
  })

  React.useEffect(()=>{
    generateDomains()
  })

  const [domains, setDomains] = React.useState<any>()

  const generateDomains = async() => {
    let rows = []
    const data = await storage.get('domainStorage')
    if (data) {
      for (let i in data as any) {
        if (i === "date") {continue}
        rows.push(
          <div className=" text-white flex flex-row justify-between items-center">
            <p>{`${i} `}</p><p>{`${data[i]}`}</p>
          </div>
        )
      }
    }
    setDomains(rows)
  }

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-slate-200 gap-1 text-center overflow-y-auto">
      {domains}
    </div>
  )
}