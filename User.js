class User{
    constructor(ID, Token){
        this.ID = ID;
        this.Token = Token;
    }
    get ID(){
        return this.ID;
    }
    get Token(){
        return this.Token;
    }
}
export default User;
//let new_user = new User('00001', 'asddqw');
//console.log(new_user);
