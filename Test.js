// let list = getAllType();
// name=name.trim();
// list.forEach(element => {
//     if(element.Name===name){
//         return false;
//     }
// });
// return true;

let list = ['Một','Hai','Ba','Bon']

function check(name){
    name=name.trim();
    let c=false;
    list.forEach(e=>{
       if(e===name){
           c=true;
       }
    })
    return c;
}

console.log(check('Một '));