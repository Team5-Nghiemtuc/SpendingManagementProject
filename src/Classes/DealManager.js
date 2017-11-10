class DealManager {
    constructor(list) {
        this.ListDeal = list;
    }

    static addDeal(temp) {
        this.ListDeal.push(temp);
    }
}

export default DealManager;