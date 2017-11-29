import User from './User'
import  Realm from 'realm'

let reposity = new Realm({
    schema: [
        {
            name:'User',
            primaryKey:'ID',
            properties:{
                ID:'string',
                Token:'string',
            }
        }
    ]
});

const UserService={ 
    getAllUser: ()=>{
        return reposity.objects('User');
    },
    addUser: (user)=>{
        const list = reposity.objects('User');
        if(list.find((e)=>{
            e===User.ID
            return true;
        })) return false;
        reposity.write('User',user);
        return true;
    }
}