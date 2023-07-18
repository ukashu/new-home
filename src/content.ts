export {}

setInterval(() => {
  console.log("runing")
  chrome.runtime.sendMessage({
    action: "tracking",
    date: new Date().toISOString(),
    domain: location.hostname
  })
}, 60000)
