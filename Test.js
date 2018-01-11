function DateConvert(input) {
    if(typeof(input.getDate)==='function'){
        let day = String(input.getDay())
        let month = String(input.getMonth()+1)
        let year = String(input.getFullYear()%100)
        day=day.length < 2 ? '0'+day: day
        month=month.length < 2? '0'+month : month
        return [day,month,year].join('/')
    }
    return ''
}

console.log(DateConvert(new Date()))