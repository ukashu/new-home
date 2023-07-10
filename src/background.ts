export {}

import { Storage } from "@plasmohq/storage"
const storage = new Storage({
  area: "local"
})

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async(message, sender, callback) => {
  if (message.action == 'tracking') {
    const current = await getCurrentTab()
    if (current && sender.tab.id === current.id) {
      console.log({domain: message.domain, date: message.date})
      addToDomainStorage(message.domain)
    }
  }
})

const addToDomainStorage = async (domain) => {
  const data: any = await storage.get('domainStorage')
  //if not initialized initialize 
  if (!data) {
    await storage.set('domainStorage', {'date': getDate(Date.now())})
    return "initialized"
  }
  //if date different from today delete and reinitialize
  if (data.date != getDate(Date.now())) {
    await storage.set('domainStorage', {'date': getDate(Date.now())})
    return "new day"
  }
  const prev = data[domain]
  await storage.set('domainStorage', {...data, [domain]: prev ? prev + 1 : 1})
}

function getDate(date) {
  let parsedDate: any = new Date(date)
  parsedDate = parsedDate.toISOString().split('T')[0]
  parsedDate = parsedDate.split('-')
  parsedDate = parsedDate[0]+parsedDate[1]+parsedDate[2] 
  return parsedDate
}