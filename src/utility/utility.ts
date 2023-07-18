export function convertToDateString(date) {
  //generates a date string in "YYYYMMDD" format
  let parsedDate: any = new Date(date)
  parsedDate = parsedDate.toISOString().split("T")[0]
  parsedDate = parsedDate.split("-")
  parsedDate = parsedDate[0] + parsedDate[1] + parsedDate[2]
  return parsedDate
}

export function createDatesArray(columns, date) {
  //generates an array of dates in "YYYYMMDD" format, of length {columns}, up to provided date
  let arr = []
  let today = date
  for (let i = 0; i < columns; i++) {
    arr.unshift(convertToDateString(today))
    today = today - 1000 * 60 * 60 * 24
  }
  return arr
}

export function getDate(date) {
  let parsedDate: any = new Date(date)
  parsedDate = parsedDate.toISOString().split("T")[0]
  parsedDate = parsedDate.split("-")
  parsedDate = parsedDate[0] + parsedDate[1] + parsedDate[2]
  return parsedDate
}
