import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import Wallet from '../../../Classes/Wallet'
import Service from '../../../Classes/Service'
import Header from './Header'
import Color from '../../Style/Color'
import Func from '../../../Classes/Function'
import List from './WalletList'
import {connect} from 'react-redux'


const { height, width } = Dimensions.get('window');

class WalletScren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: 1,
      name: '',
      amount: 0,
      size: 0
    }
  }

  componentWillMount() {
    this.setState({
      size: Service.getAllWallet().size
    })
  }

  render() {
    const {
      WalletList,
      InputContainer,
      InputName,
      InputAmount,
      Unit
    } = style;
    const{
      name,
      amount,
      add
    } = this.state
    let Add =
      <View
        style={{ flexDirection: 'row', height: height * 0.6, alignItems: 'center', justifyContent: 'space-around' }}
      >
        <View
          style={InputContainer}
        >
          <TextInput
            placeholder='Tên ví'
            underlineColorAndroid='transparent'
            style={InputName}
            fontSize={20}
            onChangeText={(text) => {
              this.setState({
                name: text
              })
            }}
          />
          <View
            style={[InputName, { flexDirection: 'row' }]}
          >
            <TextInput
              placeholder='Số tiền'
              underlineColorAndroid='transparent'
              keyboardType='phone-pad'
              style={InputAmount}
              onChangeText={(text) => {
                this.setState({
                  amount: parseInt(text)
                })
              }}
            />
            <Text
              style={Unit}
            >VND</Text>
          </View>
        </View>
      </View>
    let Body = this.state.add ?
    <View>
      <List />
    </View>
    : Add;
    
    return (
      <View
      >
        <Header
          navigation={this.props.navigation}
          name="Quản lý ví"
          check={() => {
            if(this.state.name!==''){
              let id = Func.idWallet(Service.getSizeWallet());
              const w = new Wallet(id,name,amount);
              Service.addWallet(w);
              if(Service.getSizeWallet()==1){
                Service.setWallet(id); 
                const action = {
                  type: 'SET_WALLET',
                  wallet: w
                }
              this.props.dispatch(action)
        
              }
              this.setState({ add: !add })
            }
          }}
          addNew={() => {
            this.setState({ add: !add })
          }}
          add={add}
        />
        <View
          style={WalletList}
        >
          {Body}
        </View>
      </View>
    )
  }
}

export default connect()(WalletScren)


const style = StyleSheet.create({
  WalletList: {
    backgroundColor: Color.header,
    height: height * 0.9
  },
  InputContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  InputName: {
    width: '100%',
    backgroundColor: Color.inputWallet,
    alignSelf: 'center',
    margin: 10,
  },
  InputAmount: {
    width: '80%',
    backgroundColor: Color.inputWallet,
    alignSelf: 'center',
    fontSize: 20
  },
  Unit: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    alignSelf: 'center'
  }
})