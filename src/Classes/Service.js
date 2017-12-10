import Deal from './Deal'
import Wallet from './Wallet'
import  Realm from 'realm'
//Database
//Đây là cách khai báo một bảng 
let reposity = new Realm({
    schema: [
        {
            //Bảng Deal
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
            //Bảng Wallet
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

//Service sẽ giúp ta thao các các query trên các bảng
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