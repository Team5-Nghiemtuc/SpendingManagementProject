import Deal from './Deal'
import Wallet from './Wallet'
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
        },
        {
            name: 'Wallet',
            primaryKey: 'ID',
            properties:{
                ID:'string',
                Name:'string',
                Amount:{type:'int', default:0}
            }
        }
    ]
});

export default Service={
    getAllDeal: ()=>{
        return reposity.objects('Deal');
    },
    addDeal: (deal)=>{
        const list = reposity.objects('Deal');
        if(list.find((e)=>{
            e===deal.ID
            return true;
        })) return false;
        reposity.write('Deal',deal);
        return true;
    },
    getAllWallet: ()=>{
        return reposity.objects('Wallet');
    },
    addWallet: (wallet)=>{
        try{
        reposity.write(()=>{
            reposity.create('Wallet',wallet)
        })
    }catch(e){
        console.log(e);
    }
    }
}