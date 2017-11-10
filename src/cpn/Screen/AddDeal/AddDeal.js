import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native'
import Color from '../../Style/Color'
import Header from './Header'

const {heigth, width} = Dimensions.get('window');

export default class AddDeal extends Component {
  constructor(props){
    super(props);
    this.state={
      Amount: 0,
      checkNumber: false,
      Note: ''
    }
  }
  render() {
    const {
      container,
      moneyInput,
      input,
      inputarlet,
      TypeAndWallet,
      noteInput
    } = style
    let noti = this.state.checkNumber ? 
    <Text style={{
      color:'#f74f4f',
      fontSize: 10
    }} 
    >Chỉ nhập số</Text> : 
    <Text></Text>
    return (
      <View>
        <Header
          navigation={this.props.navigation}
          check={()=>{console.log(this.state.Amount)}}
        />
        <View
          style={container}
        >
          <View
            style={moneyInput}
          >
            <Text>VND</Text>
            <TextInput
              placeholder="Số tiền"
              onChangeText={(text)=>{
                this.setState({
                  Amount: parseInt(text),
                  checkNumber: isNaN(text)
                })}
              }
              style={input}
              keyboardType='phone-pad'
              underlineColorAndroid='transparent'
            />
          </View>
          {noti}
          <View
           style={TypeAndWallet}
          >
           <Text
            style={{borderRightWidth:1, width:'50%',textAlign:'center'}}
           > Loại </Text>
           <Text
            style={{width:'50%',textAlign:'center'}} 
           > Ví </Text>
          </View>
          <TextInput
           maxLength={256}
           multiline={true}
           placeholder="Ghi chú"
           style={noteInput}
           underlineColorAndroid='transparent'
           numberOfLines={4}
           onChangeText={(text)=>{
             this.setState({
               Note: text
             })
           }}
          />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: Color.addDeal,
    alignItems: 'center'
  },
  moneyInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: width*60/100,
    marginLeft: width*10/100,
  },
  TypeAndWallet:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    borderTopWidth:1,
    borderBottomWidth:1
  },
  noteInput:{
    width: width*0.8
  }
})