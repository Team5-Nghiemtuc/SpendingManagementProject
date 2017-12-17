let today = new Date()
today= new Date(today.toLocaleDateString())
let preday = new Date(today)
let nextday = new Date(today)
preday.setTime(preday.getTime()-1)
nextday.setDate(nextday.getDate()+1)

console.log(new Date('2017-12-16') ===today);