import Deal from '../Classes/Deal';
import DealManager from '../Classes/DealManager';
import { createStore } from 'redux';
//Redux để quản lý state ở global

const defaultState = {day: new Date()}


const reducer = (state = defaultState, action) => {
  console.log(state.day)
  if(action.type==='PICK_A_DATE') {
    return {day: action.day}
  }
  if(action.type==='PRE_DAY'){
    return {day: new Date(state.day.setDate(state.day.getDate()-1))}
  }
  if(action.type==='NEXT_DAY'){
    return {day: new Date(state.day.setDate(state.day.getDate()+1))}
  }
  return state;
}

const store = createStore(reducer);

export default store;
