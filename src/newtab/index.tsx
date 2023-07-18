import "~base.css"
import "~style.css"
import Spotify from "./components/Spotify"
import Events from "./components/Events"
import Todos from "./components/Todos"
import Quotes from "./components/Quotes"
import Habits from "./components/Habits"
import Websites from "./components/Websites"
import Shortcuts from "./components/Shortcuts"
import Initializer from "./components/reusable/Initializer"
import { Storage } from "@plasmohq/storage"
import React from "react"

function IndexNewtab() {
  const [initialized, setInitialized] = React.useState({
    spotifyOn: false,
    googleOn: false
  })

  const storage = new Storage({
    area: "local"
  })

  React.useEffect(() => {
    checkInitialization()
  }, [])

  const checkInitialization = async () => {
    try {
      const spotifyOn = await storage.get("spotifyOn")
      const googleOn = await storage.get("googleOn")
      setInitialized({
        spotifyOn: spotifyOn ? true : false,
        googleOn: googleOn ? true : false
      })
    } catch (err) {
      console.error(err)
    }
  }

  const initialize = async (name) => {
    try {
      await storage.set(`${name}On`, true)
      setInitialized((prevState) => {
        return {
          ...prevState,
          [`${name}On`]: true
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-screen flex-row justify-between gap-2 p-2 font-[Inter]">
      <section
        id="left"
        className="h-100% flex w-1/5 min-w-[300px] flex-col items-center gap-2">
        <Todos />
        <Quotes
          quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          author="Lorem Ipsum"
        />
      </section>
      <section
        id="center"
        className="h-100% flex w-3/5 min-w-[400px] flex-col items-center gap-2">
        <Habits />
        <Websites />
        <Shortcuts />
      </section>
      <section
        id="right"
        className="h-100% flex w-1/5 min-w-[300px] flex-col items-center justify-between gap-2">
        {initialized.spotifyOn ? (
          <Spotify />
        ) : (
          <Initializer
            name="spotify"
            initialize={() => initialize("spotify")}
          />
        )}
        {initialized.googleOn ? (
          <Events />
        ) : (
          <Initializer name="google" initialize={() => initialize("google")} />
        )}
      </section>
    </div>
  )
}

export default IndexNewtab
