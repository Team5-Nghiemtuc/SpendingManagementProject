import Deal from './Deal'
import Wallet from './Wallet'
import Type from './Type'
import Realm from 'realm'
import Function from './Function'
//Database
//Đây là cách khai báo một bảng 
let reposity = new Realm({
    schema: [
          //Bảng Deal
        {
            name: 'Deal',
            primaryKey: 'ID',
            properties: {
                ID: 'string',
                ID_User: 'string',
                ID_Type: 'string',
                ID_Wallet: 'string',
                Amount: { type: 'int', default: 0 },
                Date: 'date',
                Content: 'string'
            }
        },
          //Bảng Wallet
        {
            name: 'Wallet',
            primaryKey: 'ID',
            properties: {
                ID: 'string',
                Name: 'string',
                Amount: { type: 'int', default: 0 }
            }
        },
        //Save ini
        {
            name: 'Save',
            primaryKey: 'ID',
            properties: {
                ID: 'string',
                ID_wallet: 'string',
                Loggin: {type:'bool',default: false},
                DealSize: { type: 'int', default: 0 }
            }
        },
        //Bảng Type
        {
            name: 'Type',
            primaryKey: 'ID',
            properties: {
                ID: 'string',
                Name: 'string',
                Type: {type:'bool',default: true},
            }
        }
    ]
});

//Service sẽ giúp ta thao các các query trên các bảng
export default Service = {
    getAllDeal: () => {
        return reposity.objects('Deal');
    },
    addDeal: (deal) => {
        try {
            reposity.write(() => {
                reposity.create('Deal', deal)
            })
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },
    getDealByDate: (date)=>{
        let list = reposity.objects('Deal');
        let fList =  list.filter(e=>{
            return e.Date.toLocaleDateString()===date.toLocaleDateString()
        });
        return fList
    },
    getDealByDateAndWallet: (date,id_wallet)=>{
        let today= new Date(date.toLocaleDateString())
        let nextday = new Date(today)
        nextday.setDate(nextday.getDate()+1)
        return reposity.objects('Deal').filtered('Date >= $0 AND Date < $1 AND ID_Wallet=$2',today,nextday,id_wallet)
    }
    ,
    getAllWallet: () => {
        return reposity.objects('Wallet');
    },
    addWallet: (wallet) => {
        try {
            reposity.write(() => {
                reposity.create('Wallet', wallet)
            })
        } catch (e) {
            console.log(e);
        }
    },
    changeWallet: (index, amount) => {
        try {
            reposity.write(() => {
                reposity.create('Wallet', { ID: index, Amount: amount }, true)
            })
        } catch (e) {
            console.log(e);
        }
    },
    getSizeWallet: ()=>{
        return reposity.objects('Wallet').length;
    },
    findWallet: (ID)=>{
        let list = reposity.objects('Wallet');
        return list.find(e=>{
            return e.ID===ID
        })
    }
    ,
    SubWallet: (ID,Amount)=>{
        try {
            reposity.write(() => {
                reposity.create('Wallet', { ID: ID, DealSize: s.DealSize+1}, true)
            })
        } catch (e) {
            console.log(e);
        }
    },
    get: ()=>{
        return reposity.objects('Save')[0]
    },
    setWallet: (id)=>{
        try {
            reposity.write(() => {
                reposity.create('Save', { ID: '000', ID_wallet: id }, true)
            })
        } catch (e) {
            console.log(e);
        }
    },
    incDealSize: ()=>{
        try {
            let s = reposity.objects('Save')[0];
            reposity.write(() => {
                reposity.create('Save', { ID: '000', DealSize: s.DealSize+1}, true)
            })
        } catch (e) {
            console.log(e);
        }
    },
    getSize: ()=>{
        return reposity.objects('Save').length;
    },
    add: (wallet)=>{
        reposity.write(()=>{
            reposity.create('Save',{ID: '000', ID_wallet: wallet, Loggin: false})
        })
    },
    getAllType: ()=>{
        return reposity.objects('Type');
    },
    getTypeCollec: ()=>{
        return reposity.objects('Type').filtered('Type==$0',true)
    },
    getTypeEx: ()=>{
        return reposity.objects('Type').filtered('Type==$0',false)
    }
    ,
    addNewType: (type)=>{
        try {
            reposity.write(() => {
                reposity.create('Type', type)
            })
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },
    checkTypeName: (name)=>{
        let list = reposity.objects('Type')
        let c = false;
        name=name.trim();
        list.forEach(element => {
            if(element.Name===name){
                c=true;
            }
        });
        return c;
    },
    addDfType: ()=>{
        Service.addNewType(new Type('0','Ăn uống',true))
        Service.addNewType(new Type('1','Vui chơi',true))
        Service.addNewType(new Type('2','Di chuyển',true))
        Service.addNewType(new Type('3','Điện nước',true))
    }
}
