import "~base.css"
import "~style.css"
import React from "react"
import { Storage } from "@plasmohq/storage"
import PrettyText from "./reusable/PrettyText"

type Props = {
  author: string,
  quote: string,
}

function Quotes(props: Props) {
  const [quote, setQuote] = React.useState({
    text: '',
    author: ''
  })

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    getAndSetQuote()
  })

  const getAndSetQuote = async() => {
    try {
      const storedQuote: any = await storage.get('quote')
      if (storedQuote) {
        setQuote({
          text: storedQuote.text,
          author: storedQuote.author
        })
      }
    } catch(err) {console.error(err)}
  }

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal text-slate-200 gap-1 text-center justify-between">
      <div className="text-xs font-bold">
        <PrettyText text={quote.text} color='#FFFFFF'/>
      </div>
      <div className="text-sm font-bold">
        <PrettyText text={quote.author} color='#FFFFFF'/>
      </div>
    </div>
  )
}

export default Quotes