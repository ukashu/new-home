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
  }, [])

  const [domains, setDomains] = React.useState<any>()

  const generateDomains = async() => {
    let rawRows = []
    let rows = []
    const data = await storage.get('domainStorage')
    if (data) {
      //sort data
      let entries = Object.entries(data);
      let sorted = entries.sort((a: any, b: any) => b[1] - a[1]);
      //generate components
      for (let i in sorted as any) {
        if (sorted[i][0] === "date") {continue}
        rows.push(
          <div key={sorted[i][0]} className=" text-white flex flex-row justify-between items-center">
            <p>{`${sorted[i][0]} `}</p><p>{`${sorted[i][1]}min`}</p>
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