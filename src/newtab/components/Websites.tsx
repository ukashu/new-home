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
    let rows = []
    const data = await storage.get('domainStorage')
    const total: any = await storage.get('totalDomainStorage')
    if (data && total) {
      //sort data
      let entries = Object.entries(data);
      let sorted = entries.sort((a: any, b: any) => b[1] - a[1]);
      //generate components
      for (let i in sorted as any) {
        if (sorted[i][0] === "date") {continue}
        let proportions = Math.floor((Number(sorted[i][1])/total)*100)
        rows.push(
          <div key={sorted[i][0]} className=" text-white flex flex-row justify-between items-center">
            <p className="w-3/12 flex-grow text-left">{`${sorted[i][0]} `}</p>
            <div className="h-full w-6/12 flex-grow mx-1 flex justify-start items-center">
              <div className={`h-[3px] rounded-md bg-zinc-600`} style={{width: `${proportions}%`}}></div>
            </div>
            <p className="w-3/12 flex-grow text-right">{`${sorted[i][1]}min / ${proportions}%`}</p>
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