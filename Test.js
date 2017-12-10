// Với việc demo các class không cần phải run được app để kiểm tra có thể làm bằng cách
// Tạo một file js bất kì
// Demo Class và Function

class Deal {
    constructor(ID, ID_User, ID_Vi, ID_Loai, SoTien, NgayGiaoDich){
      this.ID = ID;
      this.ID_User = ID_User;
      this.ID_Type = ID_Loai;
      this.ID_Wallet = ID_Vi;
      this.Amount = SoTien;
      this.Date = NgayGiaoDich;
    }
    //Đây là một method cho class
    getID(){
        return this.ID;
    }
 }

 //export default Deal; // Dòng này để xuất class ra và import vào các file khác để sử dụng

 //Tạo 1 biến mới
 let new_deal = new Deal('00001','00001','000001','000001',100000,new Date());
 //console.log(new_deal);
 //console.log(new_deal.getID());
 //gõ node *tên file* để chạy 

 //Đây là một vài cách viết các function phục vụ cho cùng 1 đích
 const Service = {
     //Đây là một arrow fucntion, giúp khai báo 1 fucntion nhanh hơn
    getID: (temp)=>{
        return temp.getID();
    },
    //Khai báo bình thường
    getID_a: function (temp){
        return temp.getID();
    }
 }
 console.log(Service.getID(new_deal));
 console.log(Service.getID_a(new_deal));
 