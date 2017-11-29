class UserManage {
    constructor(list) {
        this.ListUser = list;
    }

    static addUser(temp) {
        this.ListUser.push(temp);
    }
}

export default UserManage;