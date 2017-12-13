<<<<<<< HEAD
import Deal from '../Classes/Deal';
import DealManager from '../Classes/DealManager';
import { createStore } from 'redux';
import Wallet from '../Classes/Wallet'
import Service from '../Classes/Service'
//Redux để quản lý state ở global

const defaultState = {day: new Date()}


const reducer = (state = defaultState, action) => {
  if(action.type==='PICK_A_DATE') {
    return {...state,day: action.day}
  }
  if(action.type==='PRE_DAY'){
    return {...state,day: new Date(state.day.setDate(state.day.getDate()-1))}
  }
  if(action.type==='NEXT_DAY'){
    return {...state,day: new Date(state.day.setDate(state.day.getDate()+1))}
  }
  return state;
}

const store = createStore(reducer);

export default store;
=======
import Deal from '../Classes/Deal';
import DealManager from '../Classes/DealManager';
import { createStore } from 'redux';
//Redux để quản lý state ở global
var dealManager = new DealManager();

const defaultState = {
  DealManager: dealManager
}

const reducer = (state = defaultState, action) => {
  return state;
}

const store = createStore(reducer);

export default store;
>>>>>>> b35a3bfc041e5370539cfc7326fb3d453b920f04
