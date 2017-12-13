import {combineReducers, createStore} from 'redux'
import reducer from './reducer'
import navReducer from './nav'

const appReducer = combineReducers({
    rec: reducer,
    nav: navReducer,
})

const store = createStore(appReducer);
export default store;