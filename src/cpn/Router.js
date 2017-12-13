import { 
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';
import React from 'react'
import {Dimensions } from 'react-native'
import MainScreen from './Screen/MainScreen/MainScreen';
import WalletScreen from './Screen/WalletScreen/WalletScreen';
import Menu from './Screen/Drawer/MenuDrawer';
import AddDeal from './Screen/AddDeal/AddDeal'
import TypeScreen from './Screen/TypeScreen/TypeScreen'

const { height, width } = Dimensions.get('window');

const Router = StackNavigator({
    Main: {
        screen: MainScreen
    },
    Wallet: {
        screen: WalletScreen
    },
    AddDeal: {
        screen: AddDeal
    },
    Type: {
        screen: TypeScreen
    }
},{
    headerMode: 'none'
});

const Drawer = DrawerNavigator({
    Main: {
        screen: Router
    }
},{
    drawerWidth: width*2/4,
    drawerPosition: 'right',
    initialRouteName: 'Main',
    contentComponent: props => <Menu {...props}/>
});

export default Drawer;

