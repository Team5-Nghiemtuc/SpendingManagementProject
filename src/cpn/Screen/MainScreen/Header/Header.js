import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Service from '../../../../Classes/Service'
import Function from '../../../../Classes/Function'
import Color from '../../../Style/Color';
import Style from '../../../Style/Styles'
import {connect} from 'react-redux'

const { height, width } = Dimensions.get('window');


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Chưa có ví',
            amount: 0
        }
    }
    goToScreenWallet() {
        this.props.navigation.navigate('Wallet');
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    componentDidMount(){
        if(this.props.value){
            this.setState({
                name: this.props.value.Name,
                amount:this.props.value.Amount
            })
        }else{
            let save = Service.get();
            let w = Service.findWallet(save.ID_wallet);
            const action = {
                type: 'SET_WALLET',
                wallet: Service.findWallet(save.ID_wallet)
              }
            this.props.dispatch(action)
            this.setState({
                name: w.Name,
                amount:w.Amount
            })
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
                    <Text style={text}>{`${Function.fommatAmount(this.state.amount)} đ`}</Text>
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

function mapStateToProps(state)  {
    return {value: state.wal.wallet}
}

export default connect(mapStateToProps) (Header);

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