import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../../../Style/Color';

const { height, width } = Dimensions.get('window');


export default class Header extends Component {
    goToScreenWallet() {
        this.props.navigation.navigate('Wallet');
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    render() {
        const {
            wapper,
            info,
            text,
            textWallet
        } = styles;

        return (
            <View style={wapper} >
                <Icon.Button
                    name='wallet'
                    size={30}
                    color={Color.textHeader}
                    backgroundColor={Color.header}
                    onPress={this.goToScreenWallet.bind(this)}
                />
                <View style={info}>
                    <Text style={textWallet}> Ví 1 </Text>
                    <Text style={text}> 150000 đ </Text>
                </View>
                <Icon.Button
                    name='menu'
                    size={30}
                    color={Color.textHeader}
                    backgroundColor={Color.header}
                    onPress={this.openDrawer.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wapper: {
        backgroundColor: Color.header,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 10 / 100,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    text: {
        fontWeight: 'bold',
        color: Color.textHeader,
        fontSize: 20
    },
    textWallet: {
        color: Color.textHeader,
        fontSize: 18
    }
});