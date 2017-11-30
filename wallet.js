class Wallet
{
    constructor(ID_User, Amount)
    { 
        this.ID_User = ID_User;
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