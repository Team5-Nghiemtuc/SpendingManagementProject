import Deal from './Deal'
import  Realm from 'realm'

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

const DealService={
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