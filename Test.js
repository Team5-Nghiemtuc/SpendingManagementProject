let list =[{
    id:'111',
    amoumt:3
},{
    id:'112',
    amoumt:1
},{
    id:'111',
    amoumt:3
},{
    id:'114',
    amoumt:3
},{
    id:'115',
    amoumt:3
},]

let nList = []
list.reduce((res,value)=>{
    if(!res[value.id]) {
        res[value.id] = {
        amoumt:0,
        id: value.id
        }
        nList.push(res[value.id])
    }
   res[value.id].amoumt += value.amoumt
   return res
},{})
console.log(nList)