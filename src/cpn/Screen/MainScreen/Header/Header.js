import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Service from '../../../../Classes/Service'
import Color from '../../../Style/Color';
import Style from '../../../Style/Styles'

const { height, width } = Dimensions.get('window');


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Chưa có ví',
            amount: '0'
        }
    }
    goToScreenWallet() {
        this.props.navigation.navigate('Wallet');
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    componentWillMount(){
        let walletList = Service.getAllWallet();
        if(Service.getSize()>0){
            let save = Service.get();
            let walletId = save.ID_wallet;
            for(let i=0;i<walletList.length;i++){
                if(walletList[i].ID===walletId){
                    this.setState({
                        name: walletList[i].Name,
                        amount: walletList[i].Amount
                    })
                    break;
                }
            }
        }else{
            if(Service.getSizeWallet()>0){
                Service.add(walletList[0].ID);
                this.setState({
                    name: walletList[0].Name,
                    amount: walletList[0].Amount
                })
            }
        }
    }

    render() {
        const {
            text,
            textWallet
        } = styles;

        return (
            <View style={Style.wapper} >
                <Icon.Button
                    name='wallet'
                    size={30}
                    color={Color.textHeader}
                    backgroundColor={Color.header}
                    onPress={this.goToScreenWallet.bind(this)}
                />
                <View style={Style.info}>
                    <Text style={textWallet}>{this.state.name}</Text>
                    <Text style={text}>{`${this.state.amount} đ`}</Text>
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