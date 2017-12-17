import Wallet from '../../Classes/Wallet'
import Service from '../../Classes/Service'

//Redux để quản lý state ở global

const defaultState = {wallet: null}


const walletreducer = (state = defaultState, action) => {
  if(action.type==='SET_WALLET') {
    return {...state,wallet: action.wallet}
  }
  return state;
}
export default walletreducer;
