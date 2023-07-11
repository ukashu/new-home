import React from "react"
import "~base.css"
import "~style.css"

type Props = {
}

function Events(props: Props) {
  const [currentEvent, setCurrentEvent] = React.useState({
    name: ' ',
    color: '#9A9A9A'
  })
  const [nextEvent, setNextEvent] = React.useState({
    name: ' ',
    color: '#9A9A9A'
  })

  React.useEffect(() => {
    getAndSetEvents()
  }, [])

  function createGoogleCalendarEndpoint(email: string): string {
    let offset = new Date().getTimezoneOffset()
    let timeNow = new Date(Date.now() - offset*60*1000).toISOString()
    let timeTomorrow: any = new Date();
    timeTomorrow.setHours(24, 0, 0, 0);
    timeTomorrow.setHours(timeTomorrow.getHours() + 2);
    timeTomorrow = timeTomorrow.toISOString()
    let params = new URLSearchParams({
      orderBy: "startTime",
      singleEvents: "true",
      timeMin: `${timeNow.split('.')[0]}${getFormattedTimezoneOffset()}`,
      timeMax: `${timeTomorrow.split('.')[0]}${getFormattedTimezoneOffset()}`,
      key: process.env.PLASMO_PUBLIC_GOOGLE_API_KEY
    })
    let url = `https://www.googleapis.com/calendar/v3/calendars/${email}/events?${params}`
    return url
  }

  async function getAndSetEvents() {
    try {
      const user: any = await chrome.identity.getProfileUserInfo({accountStatus: "ANY" as any})
      const token: any = await chrome.identity.getAuthToken({interactive: true})
      const fetch_url = createGoogleCalendarEndpoint(user.email)
      const fetch_options = {
          headers: {
              "Authorization": `Bearer ${token.token}`,
              "Accept": 'application/json'
          }
      }
      const colorApiResponse = await fetch(`https://www.googleapis.com/calendar/v3/colors?key=${process.env.PLASMO_PUBLIC_GOOGLE_API_KEY}`, fetch_options)
      const colors = await colorApiResponse.json()
      const res = await fetch(fetch_url, fetch_options)
      const events = await res.json()
      let curr = events.items[0].summary
      if (curr) { 
        setCurrentEvent(() => { return {
          name: curr,
          color: events.items[0].colorId ? colors.event[events.items[0].colorId].background : '#3083FF'
        }})
      }
      let next = events.items[1].summary
      if (next) { 
        setNextEvent(() => { return {
          name: next,
          color: events.items[1].colorId ? colors.event[events.items[1].colorId].background : '#3083FF'
        }})
      }
    } catch(err) { console.error({err}) }
  }

  function getFormattedTimezoneOffset() {
    let offset: any = new Date(Date.now()).toString().split('GMT')[1].split(' ')[0]
    offset = offset.split('')
    return `${offset[0]}${offset[1]}${offset[2]}:${offset[3]}${offset[4]}`
  }

  function testing() {
    console.log('testing')
  }

  return (
    <div className="min-h-[150px] aspect-video w-full bg-black flex flex-col p-2 rounded-lg break-normal font-bold text-base">
      <div>
        <p style={{
        "backgroundImage": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${currentEvent.color} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Current event:
        </p>
        <p style={{
        "backgroundImage": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${currentEvent.color} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>{currentEvent.name}
        </p>
      </div>
      <div>
        <p style={{
        "backgroundImage": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${nextEvent.color} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text"}}>Next event:
        </p>
        <p style={{
        "backgroundImage": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${nextEvent.color} 0%, #8d8d8d 100%)`,
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent",
        "backgroundClip": "text",
        "textAlign": "center"}}>{nextEvent.name}
        </p>
      </div>
      <button onClick={testing}>
        TEST
      </button>
    </div>
  )
}

export default Events