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
  const total: any = await storage.get('totalDomainStorage')
  //if not initialized initialize 
  if (!date) {
    await storage.set('date', getDate(Date.now()))
  }
  if (!data) {
    await storage.set('domainStorage', {})
    return
  }
  if (!total && total !== 0) {
    await storage.set('totalDomainStorage', 0)
    return
  }
  //if date different from today delete and reinitialize
  if (date != getDate(Date.now())) {
    await storage.set('date', getDate(Date.now()))
    await storage.set('domainStorage', {})
    await storage.set('totalDomainStorage', 0)
    let quote: any = await fetch('https://stoic-quotes.com/api/quote')
    quote = await quote.json()
    await storage.set('quote', quote)
    return "new day"
  }
  const prev = data[domain]
  await storage.set('domainStorage', {...data, [domain]: prev ? prev + 1 : 1})
  await storage.set('totalDomainStorage', total + 1)
}