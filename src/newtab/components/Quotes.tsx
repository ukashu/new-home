import "~base.css"
import "~style.css"
import React from "react"
import { Storage } from "@plasmohq/storage"
import PrettyText from "./reusable/PrettyText"

type Props = {
  author: string
  quote: string
}

function Quotes(props: Props) {
  const [quote, setQuote] = React.useState({
    text: "",
    author: ""
  })

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    console.log("running effect")
    getAndSetQuote()
  }, [])

  const getAndSetQuote = async () => {
    try {
      const storedQuote: any = await storage.get("quote")
      if (storedQuote) {
        setQuote({
          text: storedQuote.text,
          author: storedQuote.author
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-col justify-between gap-1 break-normal rounded-lg bg-black p-2 text-center text-slate-200">
      <div className="text-xs font-bold">
        <PrettyText text={quote.text} color="#FFFFFF" />
      </div>
      <div className="text-sm font-bold">
        <PrettyText text={quote.author} color="#FFFFFF" />
      </div>
    </div>
  )
}

export default Quotes
