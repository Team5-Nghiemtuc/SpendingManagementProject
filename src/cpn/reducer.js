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
