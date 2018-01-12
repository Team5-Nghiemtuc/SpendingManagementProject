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

function GetFnLDate(input) {
    if(typeof(input.getDate)==='function'){
        let month = input.getMonth()
        let year =  input.getFullYear()
        let first = (new Date(year,month,1)).toString()
        let last = (new Date(year,month+1,1)).toString()
        return {first,last}
    }
    return ''
}

function GetDate() {
    let today = new Date()
    let m = today.getMonth()
    let y = today.getFullYear()
    while(y<2100){
        today = new Date(y,m,1)
        console.log(today.toLocaleDateString())
        m++
        y=today.getFullYear()
    }
}

GetDate()