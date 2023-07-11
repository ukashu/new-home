export {}

import { Storage } from "@plasmohq/storage"
import { getDate } from "~utility/utility";
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
  const date: any = await storage.get('date')
  const data: any = await storage.get('domainStorage')
  //if not initialized initialize 
  if (!date) {
    await storage.set('date', getDate(Date.now()))
  }
  if (!data) {
    await storage.set('domainStorage', {})
    return "initialized"
  }
  //if date different from today delete and reinitialize
  if (date != getDate(Date.now())) {
    await storage.set('date', getDate(Date.now()))
    await storage.set('domainStorage', {})
    const res = await fetch('https://stoic-quotes.com/api/quote')
    const quote = await res.json()
    await storage.set('quote', quote)
    return "new day"
  }
  const prev = data[domain]
  await storage.set('domainStorage', {...data, [domain]: prev ? prev + 1 : 1})
}