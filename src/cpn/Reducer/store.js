import {combineReducers, createStore} from 'redux'
import reducer from './reducer'
import navReducer from './nav'
import walletreducer from './wallet'

const appReducer = combineReducers({
    rec: reducer,
    nav: navReducer,
    wal: walletreducer,
})

const store = createStore(appReducer);
export default store;