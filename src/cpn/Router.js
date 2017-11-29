import { 
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';
import React from 'react'
import {Dimensions } from 'react-native'
import MainScreen from './Screen/MainScreen/MainScreen';
import WalletScreen from './Screen/WalletScreen/WalletScreen';
import Menu from './Screen/Drawer/MenuDrawer';

const { height, width } = Dimensions.get('window');

const Router = StackNavigator({
    Main: {
        screen: MainScreen
    },
    Wallet: {
        screen: WalletScreen
    }
},{
    headerMode: 'none'
});

const Drawer = DrawerNavigator({
    Main: {
        screen: Router
    }
},{
    drawerWidth: width*3/4,
    drawerPosition: 'right',
    initialRouteName: 'Main',
    contentComponent: props => <Menu {...props}/>
});

export default Drawer;

