import Drawer from '../Router';
import { NavigationActions,addNavigationHelpers  } from 'react-navigation'

const defaultState = Drawer.router.getStateForAction(
    Drawer.router.getActionForPathAndParams('Main'));
const navReducer = (state = defaultState, action)=>{
    const nextState = Drawer.router.getStateForAction(action, state);
    return nextState || state;
}
export default navReducer;