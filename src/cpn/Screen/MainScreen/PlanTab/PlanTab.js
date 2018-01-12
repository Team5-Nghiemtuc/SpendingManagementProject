import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Service from '../../../../Classes/Service'
import Func from '../../../../Classes/Function'
import Color from '../../../Style/Color'
import { Divider } from 'react-native-elements'
import InputModal from './InputModal'

export default class PlanTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Kế hoạch',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='assignment'
                color={tintColor}
                size={32}
            />
        ),
    };
    constructor(props) {
        super(props)
        this.state = {
            target: null,
            wallet: null,
            day: new Date(),
            used: 0,
            rest: 0,
            check: true
        }
    }
    openModalType() {
        this.refs.input.open();
    }
    setTarget(value) {
        Service.setTarget(value)
        let save = Service.get()
        let wallet, used = 0, rest = 0
        if(this.state.used===0){
            wallet = Service.findWallet(save.ID_wallet)
            used = Service.getDealMonth(new Date(), wallet.ID)
            rest = value-used
        }
        this.setState({
            target: value,
            used: used,
            rest: rest < 0 ? -rest : rest,
            check: rest < 0
        })
    }
    componentDidMount() {
        let save = Service.get()
        let wallet, used = 0, rest = 0
        if(save.Targets>0){
        if (save.ID_wallet === '000') {
            wallet = null
        } else {
            wallet = Service.findWallet(save.ID_wallet)
            used = Service.getDealMonth(new Date(), wallet.ID)
            rest = save.Targets - used
        }
        }
        this.setState({
            target: save.Targets,
            wallet: wallet,
            used: used,
            rest: rest < 0 ? -rest : rest,
            check: rest < 0
        })
    }
    render() {
        const {
            Text1, Wapper, Wapper1, Text2, Text3, Text4, Button
        } = style
        return (
            <View style={{height:'100%'}}>
            <View style={Wapper}>
                <View style={Wapper1}>
                    <Text style={Text1}>Hạn mức</Text>
                    <Text style={Text2}
                    >{this.state.target > 0 ? Func.fommatAmount(this.state.target) + 'đ' : 'Chưa có hạn mức'}</Text>
                </View>
                <Divider/>
                <View style={Wapper1}>
                    <Text style={Text3}>Đã chi</Text>
                    <Text style={[Text3, this.state.check ? { color: 'red' } : {}]}
                    >{this.state.check ? 'Bội chi' : 'Còn'}</Text>
                </View>
                <View style={Wapper1}>
                    <Text style={[Text3, Text4]}>{this.state.target > 0 ? Func.fommatAmount(this.state.used) + 'đ' : 0}</Text>
                    <Text style={[Text3, Text4]}>{this.state.target > 0 ? Func.fommatAmount(this.state.rest) + 'đ' : 0}</Text>
                </View>
                <View style={Wapper1}>
                    <Text style={[Text3, this.state.check ? { color: 'red' } : { color: Color.header }]}>{this.state.target > 0 ? (this.state.used / this.state.target * 100).toFixed(2) + '%' : 0}</Text>
                    <View style={Button}>
                        <Icon.Button
                            backgroundColor={Color.header}
                            name='build'
                            color={Color.textHeader}
                            onPress={this.openModalType.bind(this)}
                        >
                            <Text
                                style={{ color: Color.textHeader }}
                            >Thay đổi hạn mức</Text>
                        </Icon.Button>
                    </View>
                </View>
            </View>
            <InputModal
                ref={'input'}
                parent={this}
            />
            </View>
        )
    }
}

const style = StyleSheet.create({
    Wapper: {
        backgroundColor: Color.textHeader
    },
    Wapper1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Text1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: 'black'
    },
    Text2: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        color: Color.header
    },
    Text3: {
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 10
    },
    Text4: {
        fontWeight: 'bold'
    },
    Button: {
        marginVertical: 5,
        marginHorizontal: 10
    }
})