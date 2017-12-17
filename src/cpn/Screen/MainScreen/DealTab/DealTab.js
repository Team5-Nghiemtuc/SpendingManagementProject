
import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DaySelection from './DaySelect';
import Service from '../../../../Classes/Service'
import Function from '../../../../Classes/Function'
import Type from '../../../../Classes/Type'
import Wallet from '../../../../Classes/Wallet'
import {connect} from 'react-redux'
import {Divider} from 'react-native-elements'
import Color from '../../../Style/Color'
import Modal from 'react-native-modalbox'

const {height, width} = Dimensions.get('window')

class DealTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Giao dịch',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
             name='compare-arrows'
             color={tintColor}
             size={32}
            />
        ),
    };
    render() {
        return (
            <View>
                <DaySelection />
                <FlatList
                data={Service.getDealByDateAndWallet(
                    this.props.value,
                    Service.get().ID_wallet
                )}
                renderItem={({item, index})=>
                <DealItem
                item={item}
                />
                }
                keyExtractor={(item,index)=>item.ID}
                style={{
                    height:'90%'
                }}
                />
            </View>
        )
    }
}

class  DealItem extends Component{
    constructor(props){
        super(props);
        this.state={
            Amount: 0,
            Type: '',
            Wallet: '',
            Note: '',
            press: false
        }
    }
    componentWillMount(){
        let TypeList = Service.getAllType();
        let WalletList = Service.getAllWallet();
        let type = TypeList.find(e=>{
            return e.ID===this.props.item.ID_Type
        })
        let wallet = WalletList.find(e=>{
            return e.ID===this.props.item.ID_Wallet
        })
        if(type||wallet){
            this.setState({
                Amount: this.props.item.Amount,
                Type: type,
                Wallet: wallet.Name,
                Note: this.props.item.Content
            })
    
        }

    }

    render(){
        const {
            ItemWapper,
            Type,
            Wallet,
            Amount,
            ExAmount
        } = style
        const WandA=
        <View
        style={{
            flexDirection:'row',
            flex:1
        }}
        >
            <Text
            style={Wallet}
            >{this.state.Wallet}</Text>
            <Text
            style={this.state.Type.Type ?ExAmount : Amount}
            >{`${Function.fommatAmount(this.state.Amount)} đ`}</Text>
        </View>
        const Note =
        <View>
            <Text
            style={{
                fontSize:15,
                color: 'black',
                paddingLeft:20
            }}
            >{this.state.Note}</Text>
        </View>
        const Res = this.state.press ? Note : WandA
        return(
            <TouchableOpacity
            onPress={()=>{this.setState({
                press:!this.state.press
            })
        }}
            >
            <View style={ItemWapper}>
             <Text
             style={Type}
             >{this.state.Type.Name}</Text>
             <Divider />
             {Res}
            </View>
            </TouchableOpacity >
        )
    }
}


const style= StyleSheet.create({
    ItemWapper:{
        width: width,
        height: height*0.18,
        backgroundColor: 'white',
        alignSelf:'center',
        marginTop: height*0.05
    },
    Type:{
        padding: 10,
        paddingLeft:20,
        fontSize: 21,
        color: '#1E1E1E'
    },
    Wallet:{
        alignSelf:'center',
        color : '#F0F0F0',
        paddingLeft: 20,
        flex:2
      },
    Amount:{
        alignSelf:'center',
        flex:1,
        fontSize: 23,
        color: Color.header
    },
    ExAmount:{
        alignSelf:'center',
        flex:1,
        fontSize: 23,
        color: Color.inputarlet
    }
})

function mapStateToProps(state)  {
    return {value: state.rec.day}
}

export default connect(mapStateToProps) (DealTab);