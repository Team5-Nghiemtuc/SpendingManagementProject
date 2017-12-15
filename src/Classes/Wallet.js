class Wallet {
    constructor(ID, Name, Amount) {
        this.ID = ID;
        this.Name = Name;
        this.Amount = Amount;
    }

    getAmount()
    {
        return this.Amount;
    }

    setAmount(number)
    {  
        this.Amount = number;
    }

    getID()
    {  
        return this.ID_User;
    }
    
}

export default Wallet;