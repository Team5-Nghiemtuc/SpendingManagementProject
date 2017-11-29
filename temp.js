//import { createStore } from 'redux';

var Deal = require('./src/cpn/Classes/Deal');
  
  class DealManager {
    constructor(){
      this.ListDeal= [];
    }
  
    addDeal(temp){
        this.ListDeal.push(temp);
    }

    at(index){
        return this.ListDeal[index];
    }
  }



  var GiaoDich = new Deal('aaaa','bbbbb','qqqqq','wwwww',123,'12/3/2014');
  var ListDeal = [GiaoDich,GiaoDich]
  var DanhSach = new DealManager();
  DanhSach.addDeal(GiaoDich);
  console.log(DanhSach.at(0));