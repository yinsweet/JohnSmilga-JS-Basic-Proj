const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()


// let futureDate = new Date(2020, 5, 28, 04, 40, 0)
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0)
// console.log(futureDate)

const year = futureDate.getFullYear()
const hours = format(futureDate.getHours())
const minutes = format(futureDate.getMinutes())

let month = futureDate.getMonth()
// console.log(months[month])
month = months[month]
const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]
// console.log(weekday)

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`

// future time in ms
const futureTime = futureDate.getTime()
// console.log(futureTime)

function getRemainingTime () {
  const today = new Date().getTime()
  // console.log(today);
  const t = futureTime - today
  // console.log(t)
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hrs

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000
  // console.log(oneDay)
  // calculate all values
  let days = t / oneDay
  days = Math.floor(days)
  // console.log(days)
  let hours = Math.floor((t % oneDay) / oneHour)
  // console.log(hours)
  let minutes = Math.floor((t % oneHour) / oneMinute)
  // console.log(minutes)
  let seconds = Math.floor((t % oneMinute) / 1000)
  // console.log(seconds)

  // set values array
  const values = [days, hours, minutes, seconds]
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index])
  })

  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

function format (item) {
  if (item < 10) {
    return (item = `0${item}`)
  }
  return item
}

// Countdown
let countdown = setInterval(getRemainingTime, 1000)
getRemainingTime()
