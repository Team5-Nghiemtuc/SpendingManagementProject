//Đây là class Deal

class Deal {
    constructor(ID, ID_User, ID_Vi, ID_Loai, SoTien, NgayGiaoDich,NoiDung){
      this.ID = ID;
      this.ID_User = ID_User;
      this.ID_Type = ID_Loai;
      this.ID_Wallet = ID_Vi;
      this.Amount = SoTien;
      this.Date = NgayGiaoDich;
      this.Content = NoiDung
    }
 }

 export default Deal;