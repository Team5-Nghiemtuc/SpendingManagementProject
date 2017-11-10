import Deal from './Deal'
import  Realm from 'realm'
import default from './C:/Users/NGUYENTRANMINHAN/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/lodash-es/escapeRegExp';

let reposity = new Realm({
    schema: [
        {
            name:'Deal',
            primaryKey:'ID',
            properties:{
                ID:'string',
                ID_User:'string',
                ID_Type:'string',
                ID_Wallet: 'string',
                Amount: {type: 'int', default:0},
                Date: 'date'
            }
        }
    ]
});

export default DealService={
    getAll: ()=>{
        return reposity.objects('Deal');
    },
    add: (deal)=>{
        const list = reposity.objects('Deal');
        if(list.find((e)=>{
            e===deal.ID
            return true;
        })) return false;
        reposity.write('Deal',deal);
        return true;
    }
}