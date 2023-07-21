import React from "react"
import "~base.css"
import "~style.css"

function createGoogleCalendarEndpoint(email: string): string {
  let offset = new Date().getTimezoneOffset()
  let timeNow = new Date(Date.now() - offset * 60 * 1000).toISOString()
  let timeTomorrow: any = new Date()
  timeTomorrow.setHours(24, 0, 0, 0)
  timeTomorrow.setHours(timeTomorrow.getHours() + 2)
  timeTomorrow = timeTomorrow.toISOString()
  let params = new URLSearchParams({
    orderBy: "startTime",
    singleEvents: "true",
    timeMin: `${timeNow.split(".")[0]}${getFormattedTimezoneOffset()}`,
    timeMax: `${timeTomorrow.split(".")[0]}${getFormattedTimezoneOffset()}`,
    key: process.env.PLASMO_PUBLIC_GOOGLE_API_KEY
  })
  let url = `https://www.googleapis.com/calendar/v3/calendars/${email}/events?${params}`
  return url
}

async function getToken() {
  const token: any = await chrome.identity.getAuthToken({
    interactive: true
  })
  return token.token
}

async function getEmail() {
  const user: any = await chrome.identity.getProfileUserInfo({
    accountStatus: "ANY" as any
  })
  return user.email
}

async function getEvents(token: string) {
  const email: any = await getEmail()
  const fetch_url = createGoogleCalendarEndpoint(email)
  const fetch_options = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  }
  let res = await fetch(fetch_url, fetch_options)
  res = await res.json()
  return res
}

async function getColors(token: string) {
  const fetch_options = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  }
  let res = await fetch(
    `https://www.googleapis.com/calendar/v3/colors?key=${process.env.PLASMO_PUBLIC_GOOGLE_API_KEY}`,
    fetch_options
  )
  res = await res.json()
  return res
}

function getFormattedTimezoneOffset() {
  let offset: any = new Date(Date.now()).toString().split("GMT")[1].split(" ")[0]
  offset = offset.split("")
  return `${offset[0]}${offset[1]}${offset[2]}:${offset[3]}${offset[4]}`
}

function Events() {
  const [currentEvent, setCurrentEvent] = React.useState({
    name: " ",
    color: "#9A9A9A"
  })
  const [nextEvent, setNextEvent] = React.useState({
    name: " ",
    color: "#9A9A9A"
  })

  React.useEffect(() => {
    const initialize = async () => {
      const token = await getToken()
      const colors = await getColors(token)
      const events = await getEvents(token)
      setEvents(events, colors)
    }
    initialize().catch(console.error)
  }, [])

  function setEvents(events, colors) {
    let curr = events.items[0].summary
    if (curr) {
      setCurrentEvent({
        name: curr,
        color: events.items[0].colorId ? colors.event[events.items[0].colorId].background : "#3083FF"
      })
    }
    let next = events.items[1].summary
    if (next) {
      setNextEvent({
        name: next,
        color: events.items[1].colorId ? colors.event[events.items[1].colorId].background : "#3083FF"
      })
    }
  }

  return (
    <div className="flex aspect-video min-h-[150px] w-full flex-col justify-between break-normal rounded-lg bg-black px-5 py-4 text-sm font-bold">
      <div>
        <p
          style={{
            backgroundImage: `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${currentEvent.color} 0%, #8d8d8d 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
          Current event:
        </p>
        <p
          style={{
            backgroundImage: `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${currentEvent.color} 0%, #8d8d8d 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textAlign: "center"
          }}>
          {currentEvent.name}
        </p>
      </div>
      <div>
        <p
          style={{
            backgroundImage: `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${nextEvent.color} 0%, #8d8d8d 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
          Next event:
        </p>
        <p
          style={{
            backgroundImage: `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${nextEvent.color} 0%, #8d8d8d 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textAlign: "center"
          }}>
          {nextEvent.name}
        </p>
      </div>
      <div>TEST</div>
    </div>
  )
}

export default Events
