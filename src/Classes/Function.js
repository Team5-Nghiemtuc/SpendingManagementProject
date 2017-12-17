
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export default Func = {
idWallet: (size)=>{
    let string =uuidv4();
    return 'WLLT-'+string+'-'+size.toString();
},
idDeal: (size)=>{
    let string =uuidv4();
    return 'DLL-'+string+'-'+size.toString();
},
idType: (size)=>{
    let string =uuidv4();
    return 'TPE-'+string+'-'+size.toString();
},
fommatAmount: (amount)=>{
    return amount.toFixed().replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
}
}